import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { CacheService } from './cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  users: { avatar_url: string }[] = [];
  title = 'cache-storage';

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService
  ) {}
  
  ngOnInit() {
    this.getUsers();
  }
 
  getUsers() {
    this.cacheService.getCachedOrFetch<any[]>('https://api.github.com/users').subscribe(
      (data) => {
        // console.log(data);
        this.users = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
