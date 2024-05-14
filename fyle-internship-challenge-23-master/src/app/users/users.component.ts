import { Component, OnInit } from '@angular/core';
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
  bio: string = ''; // Add a variable to store bio

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
    this.service.getWithCache<any>(`https://api.github.com/users/${userId}/repos`, {})
      .subscribe((data) => {
        this.repositories = data || [];
        this.total = data?.total_count || this.repositories.length; 
        this.details = data;
        this.getBio(userId); 
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

  getBio(userId: string) {
    this.service.getName(userId).subscribe(
      (data: any) => {
        this.bio = data.bio || ''; // Assign bio value or empty string if bio is null
      },
      (error) => {
        console.error('Error fetching bio:', error);
      }
    );
  }
}
