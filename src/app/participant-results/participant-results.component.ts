import {Component, OnChanges} from '@angular/core';
import {Division} from "../shared/data/division";
import {ParticipantResults} from "../shared/data/participant-results";
import {ParticipantResultsService} from "../shared/participant-results.service";
import {DivisionService} from "../shared/division.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";
import {DivisionDrawerService} from "../shared/division-drawer.service";

@Component({
  selector: 'bmm-participant-results',
  templateUrl: './participant-results.component.html',
  styleUrls: ['./participant-results.component.scss']
})
export class ParticipantResultsComponent implements OnChanges {
  divisions: Division[] = [];
  participantResults: ParticipantResults | undefined;
  divisionDrawerOpened = false;

  constructor(private divisionService: DivisionService,
              private participantResultsService: ParticipantResultsService,
              private route: ActivatedRoute,
              private router: Router,
              private divisionDrawerService: DivisionDrawerService) {
    this.setupData();
  }

  ngOnChanges() {
    this.setupData();
  }

  setupData() {
    this.divisionDrawerOpened = this.divisionDrawerService.isOpen();
    this.route.paramMap.pipe(map(params => params.get('participantId')!),
      switchMap(pId => this.participantResultsService.getParticipantResults(parseInt(pId)))
    ).subscribe(pr => {
      this.participantResults = pr;
      this.divisionService.getBySeason(pr.seasonName).subscribe(ds => {
        this.divisions = ds;
      });
    });
  }

  setDivision(division: Division) {
    this.router.navigate(['seasons', this.participantResults!.seasonName, {divisionId: division.id}]);
  }

  openDrawer() {
    this.divisionDrawerService.openDrawer();
    this.divisionDrawerOpened = true;
  }

  closeDrawer() {
    this.divisionDrawerService.closeDrawer();
    this.divisionDrawerOpened = false;
  }
}
