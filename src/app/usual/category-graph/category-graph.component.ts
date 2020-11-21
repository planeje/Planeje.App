import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Category } from '../models/category.model';
import { SpendingGoal } from '../models/spending-goal.model';

type CategoriesGraph = {
  id: number;
  name: string;
  color: Color[];
  spendigGoal: SpendingGoal;
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

  // Tipo do gráfico
  public barChartType: ChartType = 'bar';
  // Se mostra a legenda
  public barChartLegend = true;
    // Valor gasto
  public barChartData: ChartDataSets[];
  // Recebe as cores das categorias
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
          spendigGoal: c.spendingGoals[0]
        }
      }
    });

    if (!!this.categoriesGraph) {
      this.barChartData = this.categoriesGraph.map(c => {
        const { name } = c;
        const columnValue = (c.spendigGoal?.value - c.spendigGoal?.valueAvaible) || 0
        return { data: [columnValue], label: name }
      });
      this.barChartColors = this.categoriesGraph.map(c => c.color[0]);
    } else {
      this.barChartData = [{ data: [0], label: 'Sem metas atuais' }];
    }

  }
}


