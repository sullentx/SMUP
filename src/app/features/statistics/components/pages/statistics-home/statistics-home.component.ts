import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsTableComponent } from '../../statistics-table/statistics-table.component';
import { Statistic } from '../../statistics-table/models/stats.interface';
import { Router } from '@angular/router';
import { BackButtonComponent } from '../../../../consultation/components/buttons/back-button/back-button.component';
@Component({
  selector: 'app-statistics-home',
  standalone: true,
  imports: [CommonModule, StatisticsTableComponent,BackButtonComponent],
  templateUrl: './statistics-home.component.html',
  styleUrls: ['./statistics-home.component.scss']
})
export class StatisticsHomeComponent implements OnInit {
  statistics: Statistic[] = [];
  currentPage = 0;
  pageSize = 10;
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.loadStatistics();
  }
  
  loadStatistics(): void {
    this.statistics = [
      { id: '001', name: 'Género' },
      { id: '002', name: 'Clasificación de Edad' },
      { id: '003', name: 'Clasificación de Antigüedad' },
      { id: '004', name: 'Escolaridad' },
      { id: '005', name: 'Turno' },
      { id: '006', name: 'Tipos de Contrato' },
      { id: '007', name: 'Estado Civil' },
      { id: '008', name: 'Practican deporte o hacen ejercicio' },
      { id: '009', name: 'Diversión con familia o Asisten algún tipo de actividad cultural' },
      { id: '010', name: 'Estudian con regularidad o Leen libros técnicos o literarios' },
      { id: '011', name: 'Consumo de alimentos con mayor frecuencia' },
      { id: '012', name: 'Higiene Bucodental' },
      { id: '013', name: 'Total de mujeres que han tenido o se han realizado' },
      { id: '014', name: 'Total de hombres que han tenido' },
      { id: '015', name: 'Antecedentes Familiares' },
      { id: '016', name: 'Antecedentes Personales Patológicos' },
      { id: '017', name: 'Capacitación' },
      { id: '018', name: 'Exposición en el medio ambiente de trabajo' },
      { id: '019', name: 'Agentes Psicosociales del contenido del trabajo' },
      { id: '020', name: 'Organización del tiempo' },
      { id: '021', name: 'Agentes Psicosociales de las Relaciones Humanas' },
      { id: '022', name: 'Administración de la empresa' },
      { id: '023', name: 'Riesgos Ergonómicos' },
      { id: '024', name: 'Riesgos Mecánicos Eléctricos' },
      { id: '025', name: 'Riesgos del Medio Ambiente' },
      { id: '026', name: 'Riesgo Prostático' },
      { id: '027', name: 'Estilos de vida' },
      { id: '028', name: 'Categorías Riesgo Prostático' },
      { id: '029', name: 'Riesgo en Mujeres' },
      { id: '030', name: 'Antecedentes Personales y Familiares' },
      { id: '031', name: 'Categorías Capacitación' },
      { id: '032', name: 'Agentes del ambiente laboral' },
      { id: '033', name: 'Contenido del trabajo' },
      { id: '034', name: 'Relaciones Humanas' },
      { id: '035', name: 'Categorías Organización del tiempo' },
      { id: '036', name: 'Categorías Administración de la empresa' },
      { id: '037', name: 'Ergonómicos' },
      { id: '038', name: 'Categorías Mecánicos Eléctricos' },
      { id: '039', name: 'Categorías Medio Ambiente del Trabajo' },
      { id: '040', name: 'Ausentismo' },
      { id: '041', name: 'Porcentaje de masa ósea' },
      { id: '042', name: 'Índice de masa corporal' },
      { id: '043', name: 'Porcentaje de masa visceral' },
      { id: '044', name: 'Porcentaje de masa grasa' },
      { id: '045', name: 'Porcentaje de masa muscular' },
      { id: '046', name: 'Kilos de sobrepeso' },
      { id: '047', name: 'Índice general de flexibilidad' },
      { id: '048', name: 'Índice general de fuerza' },
      { id: '049', name: 'Índice cintura cadera' },
      { id: '050', name: 'Consumo de Oxígeno' },
      { id: '051', name: 'Coordinación Motora' },
      { id: '052', name: 'Presión Arterial' },
      { id: '053', name: 'Colesterol' },
      { id: '054', name: 'Triglicéridos' },
      { id: '055', name: 'Glicemia' },
      { id: '056', name: 'Personas Atendidas' },
      { id: '057', name: 'Personas Atendidas por Alumnos' },
      { id: '058', name: 'Personas Atendidas por Administrativo'},
      { id: '059', name: 'Personas Atendidas por Contratistas Externos' },
      { id: '060', name: 'Personas Atendidas por Profesor de Asignatura' },
      { id: '061', name: 'Personas Atendidas por Profesor de Tiempo Completo' },
      { id: '062', name: 'Programa Educativo' },
      { id: '063', name: 'Ingeniería Biomédica' },
      { id: '064', name: 'Ingeniería Mecatrónica' },
      { id: '065', name: 'Ingeniería Agroindustrial' },
      { id: '066', name: 'Licenciatura en Ingeniería en Alimentos' },
      { id: '067', name: 'Ingeniería en Energía' },
      { id: '068', name: 'Licenciatura en Energía en Desarrollo Sostenible' },
      { id: '069', name: 'Ingeniería Tecnología Ambiental' },
      { id: '070', name: 'Licenciatura en Ingeniería Ambiental y Sustentabilidad' },
      { id: '071', name: 'Maestría en Energías Renovables' },
      { id: '072', name: 'Doctorado en Ingeniería' },
      { id: '073', name: 'Ingeniería Petrolera' },
      { id: '074', name: 'Ingeniería Tecnología Manufactura' },
      { id: '075', name: 'Licenciatura en Manufactura Avanzada' },
      { id: '076', name: 'Licenciatura en Ingeniería en Nanotecnología' },
      { id: '077', name: 'Ingeniería en Software' },
      { id: '078', name: 'Licenciatura en ingeniería en Tecnologías e Innovación Digital' },
      { id: '079', name: 'Licenciatura en Administración y Gestión Empresarial' },
      { id: '080', name: 'Licenciatura en Administración' },
      { id: '081', name: 'Maestría en Biotecnología' },
      { id: '082', name: 'Atención Médica Proporcionada' },
      { id: '083', name: 'Estudio Paraclínico Realizado' },
      { id: '084', name: 'Prevalencia por morbilidad por categoría' },
      { id: '085', name: 'Incidencia de morbilidad por otras causas' }
    ];
  }
  

  
  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  onNextPage(): void {
    const totalPages = Math.ceil(this.statistics.length / this.pageSize);
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
    }
  }
  onBack(): void {
    this.router.navigate(['/home']);
   }
}