import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import Typed from 'typed.js'; // Import Typed.js library
import { ApiService } from '../services/api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  users: any;
  userId: string = '';
  userName: string = ''; 
  loaded = false;
  showFamousReposSection: boolean = false;
  showFamousRepos = false;
  private typed!: Typed; // Declare typed as a property
  characters: string[] = [];

  catImage : string = '/assets/github-logo.webp';

  constructor(public api: ApiService, private router: Router, public service: ApiService) { }

  ngOnInit(): void {
    // Initialize component
  }

  ngAfterViewInit() {
    this.initializeTyped();
    this.secondTyped();
    setTimeout(() => {
      this.loaded = true;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  }

  private initializeTyped() {
    this.typed = new Typed('.role', {
      strings: [
        "GitHub",
        "GitUsers",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });
  }

  private secondTyped(){
    this.typed = new Typed('.text-github', {
      strings: [
        
       
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
    });

  }
  

  getData(){
    this.api.getData().subscribe((data)=>{
      this.users = data;
    }, (error) => {
      console.log(error);
    })
  }

  toggleFamousReposSection() {
    if (this.showFamousRepos == false) {
      this.showFamousRepos = true;
      this.getData();
      // console.log("API called");
    }
    this.showFamousReposSection = !this.showFamousReposSection; 
  }
  
  repos(userId: string){
    // console.log(userId);
    this.router.navigate(['/users'], { queryParams: { userId: userId} })
  }
}
