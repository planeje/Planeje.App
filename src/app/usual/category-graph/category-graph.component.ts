import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-category-graph',
  templateUrl: './category-graph.component.html',
  styleUrls: ['./category-graph.component.scss'],
})
export class CategoryGraphComponent implements OnInit{
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
          ticks: {
          beginAtZero: true,
            max : 500,
          }
      }]
    }
    // We use these empty structures as placeholders for dynamic theming.
  };
  public categories =  [ 
  {  category_id: 500, category_name: 'Lazer', color: [{ backgroundColor: 'blue'}]} ,
  {  category_id: 400, category_name: 'Casa',color: [{ backgroundColor: 'red'}]},
  {  category_id: 300, category_name: 'Despesas fixas', color: [{ backgroundColor: 'green'}]},
  ];

  // Recebe ao nome das categorias
  // public barChartLabels: Label = this.categories.map(c => c.category_name)
  // Tipo do gráfico
  public barChartType: ChartType = 'bar';
  // Se mostra a legenda
  public barChartLegend = true;
    // Valor gasto
  public barChartData: ChartDataSets[] = this.categories.map(c => {
    const {category_name, category_id} = c;
    return {data: [category_id], label: category_name }
  })
  //Recebe as cores das categorias
  public barChartColors: Color[] = this.categories.map(c => c.color[0])
  constructor() {
  }
  ngOnInit(){
    console.log(this.barChartColors)
    }
  }
  


