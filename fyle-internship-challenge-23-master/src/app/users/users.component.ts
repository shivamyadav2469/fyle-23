import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  uparams: any;
  userId: string = '';
  details: any;
  repositories: any[] = [];
  loaded = false;
  total: number = 0; 
  pageSize: number = 10; 
  currentPage: number = 1; 
  itemsPerPageOptions: number[] = [10, 15, 25, 50, 100]; 
 

  constructor(private route: ActivatedRoute, public service: ApiService) {
    this.pageSize = 10;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.uparams = params;
      this.userId = this.uparams.params.userId;
      this.getCachedRepos(this.userId);
    });
  }

  goToRepo(userId: string, repoName: string) {
    window.open(`https://github.com/${userId}/${repoName}`);
  }

  getCachedRepos(userId: string) {
    this.service.getWithCache<any>(`https://api.github.com/users/${userId}/repos`, {
      page: this.currentPage,
      per_page: this.pageSize 
    })
      .subscribe((data) => {
        // console.log('data:', data);
        this.repositories = data || [];
        // console.log("the reoos is", this.repositories);
        // Update total count from API response
        this.total = data?.total_count || this.repositories.length; 
        // console.log("the total is ", this.total);
        this.details = data;
        // console.log("the details is ", this.details);
        this.loaded = true;
      }, (error) => {
        console.error(error);
        window.history.go(-1);
      });
  }
  
  nextPage(): void {
    if (this.currentPage < this.calculatePages()) {
      this.currentPage++;
      this.getCachedRepos(this.userId);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getCachedRepos(this.userId);
    }
  }

  calculatePages(): number {
    const pageSize = this.pageSize || 10;
    return Math.ceil(this.total / pageSize) || 0;
  }

  onPageSizeChange(event: Event) {
    this.pageSize = parseInt((<HTMLSelectElement>event.target).value, 10);
    this.currentPage = 1; 
    this.getCachedRepos(this.userId); 
  }
}
