import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsDataService {
  // En una aplicación real, esta URL apuntaría a tu API
  private apiBaseUrl = 'assets/mock-data/statistics';
  
  // Datos simulados para desarrollo
  private mockData: { [key: string]: any } = {
    '001': { // Género
      labels: ['Masculino', 'Femenino',],
      data: [45, 52]
    },
    '002': { // Clasificación de Edad
      labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
      data: [22, 35, 25, 15, 3]
    },
    // Datos simulados para más estadísticas...
  };
  
  constructor(private http: HttpClient) { }
  
  getStatisticData(statisticId: string): Observable<any> {
    // En desarrollo, usar datos simulados
    if (this.mockData[statisticId]) {
      return of(this.mockData[statisticId]);
    }
    
    // Generar datos aleatorios para estadísticas sin datos simulados específicos
    return this.generateMockData(statisticId);
    
    // En producción, usar la API real
    // return this.http.get(`${this.apiBaseUrl}/${statisticId}`)
    //   .pipe(
    //     catchError(error => {
    //       console.error('Error fetching statistic data:', error);
    //       return of(null);
    //     })
    //   );
  }
  
  // Método para generar datos aleatorios para desarrollo
  private generateMockData(statisticId: string): Observable<any> {
    // Define categorías basadas en el ID de estadística
    const categoriesMap: { [key: string]: string[] } = {
      default: ['Categoría A', 'Categoría B', 'Categoría C', 'Categoría D'],
      // Puedes definir categorías específicas para ciertos IDs
      '003': ['0-1 años', '1-3 años', '3-5 años', '5-10 años', '10+ años'],
      '004': ['Bachillerato', 'Licenciatura', 'Maestría', 'Doctorado', 'Otro'],
      // Añadir más según sea necesario...
    };
    
    const categories = categoriesMap[statisticId] || categoriesMap;
    const dataPoints = [];
    
    // Generar datos aleatorios para cada categoría
    for (let i = 0; i < categories.length; i++) {
      dataPoints.push(Math.floor(Math.random() * 50) + 10); // Valores entre 10 y 59
    }
    
    return of({
      labels: categories,
      data: dataPoints
    });
  }
}