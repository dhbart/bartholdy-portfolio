import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { About } from "../../components/about/about";
import { FeaturedProject } from '../../components/featured-project/featured-project';
import { Contact } from '../../components/contact/contact';
import { ProjectsGrid } from '../../components/projects-grid/projects-grid';
import { Experience } from '../../components/experience/experience';

@Component({
  selector: 'bp-home',
  imports: [Hero, About, FeaturedProject, ProjectsGrid, Experience, Contact],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
