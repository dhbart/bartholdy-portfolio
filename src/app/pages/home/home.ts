import { Component } from '@angular/core';
import { Hero } from '../../features/hero/hero';
import { About } from '../../features/about/about';
import { FeaturedProject } from '../../features/projects/featured-project';
import { Contact } from '../../features/contact/contact';
import { ProjectsGrid } from '../../features/projects/projects-grid';
import { Experience } from '../../features/experience/experience';
import { Certification } from "../../features/certifications/certification";

@Component({
  selector: 'bp-home',
  imports: [Hero, About, FeaturedProject, ProjectsGrid, Experience, Contact, Certification],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
