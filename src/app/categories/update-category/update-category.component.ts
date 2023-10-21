import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from "../../_services/category.service";
import {Category} from "../../_models/category";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Group} from "../../_models/group";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router)
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  initialCategoryData: Group | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        const id: string | null = params.get('id');
        if (id === null) {
          this.router.navigateByUrl('/categories');
        } else {
          this.categoryService.getCategory(id).subscribe({
            next: (category: Category) => this.initialCategoryData = category
          });
        }
      }
    });
  }


  update(category: Category): void {
    this.categoryService.update(category).subscribe({
      next: () => this.router.navigateByUrl('/categories'),
      error: (err) => console.log(err)
    });
  }
}
