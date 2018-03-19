import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStoreService } from '../shared/app-store/app-store.service';
import { ActivatedRoute } from '@angular/router';


let images = {
  kiev: 'https://i.szalas.hu/hotels/645198/500x500/8110500.jpg',
  london: 'https://cdn.londonandpartners.com/assets/73295-640x360-london-skyline-ns.jpg',
  moscow:'https://www.hoganlovells.com/~/media/hogan-lovells/images/locations/moscow.jpg',
  boston:'https://assets3.thrillist.com/v1/image/2442752/size/tmg-article_main_wide_2x.jpg'
}

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
    this.sites = this.route.snapshot.data['cities'].map( item => {
      item.imageSrc = images[item.site.replace(/\d+/g, '').toLowerCase()];
      return item;
    });
  }
}
