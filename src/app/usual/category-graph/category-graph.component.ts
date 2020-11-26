import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Category } from '../models/category.model';
import { SpendingGoal } from '../models/spending-goal.model';

type CategoriesGraph = {
  id: number;
  name: string;
  color: Color[];
  spendingGoal: SpendingGoal;
}

@Component({
  selector: 'app-category-graph',
  templateUrl: './category-graph.component.html',
  styleUrls: ['./category-graph.component.scss'],
})
export class CategoryGraphComponent implements OnInit{
  @Input() categories: Category[];
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max : 1000,
        }
      }]
    }
  };
  public categoriesGraph: CategoriesGraph[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[];
  public barChartColors: Color[];
  constructor() {
  }

  ngOnInit() {
    this.categoriesGraph = this.categories.filter(c => {
      if (!!c.spendingGoals)
        return c
    }).map(c => {
      if (c.spendingGoals) {
        return {
          id: c.id,
          name: c.name,
          color: [{ backgroundColor: c.color }],
          spendingGoal: c.spendingGoals[0]
        }
      }
    });
    if (this._hasGoal(this.categoriesGraph)) {
      this.barChartData = this.categoriesGraph.map(c => {
        const { name } = c;
        const columnValue = (c.spendingGoal?.value - c.spendingGoal?.valueAvaible) || 0
        return { data: [columnValue], label: name }
      });
      this.barChartColors = this.categoriesGraph.map(c => c.color[0]);
    } else {
      this.barChartData = [{ data: [0], label: 'Nenuma meta cadastrada' }];
    }
  }

  private _hasGoal(categoriesArr: CategoriesGraph[]): boolean {
    let spendingGoal: any;
    categoriesArr.forEach(el => {
      if(!!!spendingGoal && !!el.spendingGoal) {
        spendingGoal = el.spendingGoal;
      }
    })

    if(!!spendingGoal){
      return true
    }

    return false;
  }
}


