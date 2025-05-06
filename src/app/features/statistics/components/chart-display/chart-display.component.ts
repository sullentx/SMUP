import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto'; // Cambia esta línea
import { StatisticsDataService } from '../../services/statistics-data.service';
import { BackButtonComponent } from '../../../consultation/components/buttons/back-button/back-button.component';

@Component({
  selector: 'app-chart-display',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.scss']
})
export class ChartDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  
  statisticId: string = '';
  statisticName: string = '';
  chart: Chart | null = null;
  chartData: any = {};
  isLoading: boolean = true;
  error: string | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private statisticsService: StatisticsDataService
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.statisticId = id;
        const allStats = this.getAllStatisticsList();
        const stat = allStats.find(s => s.id === this.statisticId);
        this.statisticName = stat ? stat.name : `Estadística ${this.statisticId}`;
        this.loadChartData();
      } else {
        this.error = 'ID de estadística no encontrado';
        this.isLoading = false;
      }
    });
  }
  
  ngAfterViewInit(): void {
    if (this.chartData && this.chartData.labels && !this.isLoading) {
      this.renderChart();
    }
  }
  
  loadChartData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.statisticsService.getStatisticData(this.statisticId)
      .subscribe({
        next: (data) => {
          this.chartData = data;
          this.isLoading = false;
          
          setTimeout(() => {
            this.renderChart();
          }, 0);
        },
        error: (err) => {
          this.error = 'No se pudo cargar los datos para esta estadística.';
          this.isLoading = false;
          console.error('Error loading statistic data:', err);
        }
      });
  }
  
  renderChart(): void {
    if (!this.chartCanvas || !this.chartData || !this.chartData.labels || !this.chartData.data) {
      this.error = 'No hay datos disponibles para mostrar.';
      return;
    }
    
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      this.error = 'No se pudo obtener el contexto del canvas.';
      return;
    }
    
    if (this.chart) {
      this.chart.destroy();
    }
    
    console.log('Rendering chart with data:', this.chartData);
    
    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.chartData.labels,
        datasets: [{
          data: this.chartData.data,
          backgroundColor: this.generateColors(this.chartData.data.length),
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: this.statisticName,
            font: {
              size: 16
            }
          }
        }
      }
    });
  }
  
  generateColors(count: number): string[] {
    const blueColors = [
      '#0D47A1', 
      '#1565C0',
      '#1976D2',
      '#1E88E5',
      '#2196F3',
      '#42A5F5',
      '#64B5F6',
      '#90CAF9',
      '#BBDEFB',
      '#E3F2FD', 
      '#0D1B2A', 
      '#1B263B',
      '#415A77',
      '#778DA9',
      '#E0E1DD'  
    ];
    
    if (count <= blueColors.length) {
      return blueColors.slice(0, count);
    }
    
    const extraBlues = [];
    for (let i = 0; i < count - blueColors.length; i++) {
      const r = Math.floor(Math.random() * 100);          
      const g = Math.floor(Math.random() * 150) + 50;     
      const b = Math.floor(Math.random() * 55) + 200;     
      extraBlues.push(`rgb(${r}, ${g}, ${b})`);
    }
    
    return [...blueColors, ...extraBlues];
  }
  
  onBack(): void {
    window.history.back();
  }
  

  getAllStatisticsList(): {id: string, name: string}[] {
    return [
      { id: '001', name: 'Género' },
      { id: '002', name: 'Clasificación de Edad' },
    ];
  }
  getColorForIndex(index: number): string {
    const colors = this.generateColors(this.chartData.data.length);
    return colors[index];
  }
  
  calculatePercentage(index: number): string {
    if (!this.chartData || !this.chartData.data || this.chartData.data.length === 0) {
      return '0';
    }
    
    const total = this.chartData.data.reduce((sum: number, value: number) => sum + value, 0);
    if (total === 0) {
      return '0';
    }
    
    const percentage = (this.chartData.data[index] / total) * 100;
    return percentage.toFixed(1); // Redondea a 1 decimal
  }
}

