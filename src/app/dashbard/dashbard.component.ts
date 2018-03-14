import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStoreService } from '../shared/app-store/app-store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dashbard',
  templateUrl: './dashbard.component.html',
  styleUrls: ['./dashbard.component.css']
})
export class DashbardComponent implements OnInit {
  public sites: any;
  constructor(
    private http: HttpClient,
    private appStore: AppStoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sites = this.route.snapshot.data['cities'];
  }
}
