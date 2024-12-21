import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Bell,
  Calendar1,
  ChartNoAxesCombined,
  DiamondPlus,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  LogOut,
  LucideAngularModule,
  Settings,
  ShieldPlus,
  Star,
  User,
} from 'lucide-angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenu,
  IonMenuButton,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonIcon,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';
import { Academico } from 'src/app/models/academico.model';
import { MetaDiariaService } from 'src/app/services/meta-diaria.service';
import { MetaDiaria } from 'src/app/models/meta-diaria.model';
import { MetaEsportivaService } from 'src/app/services/meta-esportiva.service';
import { MetaEsportiva } from 'src/app/models/meta-esportiva.model';
import { forkJoin } from 'rxjs';
import { CampeonatoService } from 'src/app/services/campeonato.service';
import { Avaliacao } from 'src/app/models/avaliacao.model';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenu,
    IonMenuButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonItemGroup,
    IonIcon,
    LucideAngularModule,
  ],
})
export class MenuPerfilComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private metaDiariaService: MetaDiariaService,
    private metaEsportivaService: MetaEsportivaService,
    private router: Router,
    private campeonatoService: CampeonatoService
  ) {}

  @Input() title: string = '';
  @Input() menu: string = '';
  @Input() menuContentId: string = '';

  user: Academico | null = null;
  metasDiarias: MetaDiaria[] = [];
  modalidadesUsuario: any[] = [];
  metasPorModalidade: MetaEsportiva[] = [];
  metasEsportivas: MetaEsportiva[] = [];
  metasPorModalidade2: {
    [key: number]: { idModalidadeEsportiva: number; metas: MetaEsportiva[] };
  } = {};
  metasPorModalidadeArray: any = [];

  mediaAvaliacao: Avaliacao | null = null;
  mediaAtual: number = 0;
  quantidadeEstrelas: number = 0;
  temEstrelaMeia: boolean = false;

  selectedRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  readonly User = User;
  readonly GraduationCap = GraduationCap;
  readonly Bell = Bell;
  readonly ShieldPlus = ShieldPlus;
  readonly HeartPulse = HeartPulse;
  readonly ChartNoAxesCombined = ChartNoAxesCombined;
  readonly Settings = Settings;
  readonly Calendar1 = Calendar1;
  readonly DiamondPlus = DiamondPlus;
  readonly Dumbbell = Dumbbell;
  readonly Star = Star;
  readonly LogOut = LogOut;

  obterMediaAvaliacao(): void {
    if (this.user && this.user.idAcademico) {
      this.campeonatoService.getMediaAvaliacao(this.user.idAcademico).subscribe(
        (data: Avaliacao | null) => {
          this.mediaAvaliacao = data;
          this.calcularMedia();
        },
        (error) => {
          console.error('Erro ao obter avaliação:', error);
        }
      );
    }
  }

  calcularMedia() {
    if (this.mediaAvaliacao) {
      this.mediaAtual = this.mediaAvaliacao.mediaGeral;
      this.quantidadeEstrelas = Math.floor(this.mediaAtual);
      this.temEstrelaMeia = this.mediaAtual % 1 >= 0.5;
      this.atualizarEstrelas();
    }
  }

  atualizarEstrelas() {
    this.stars = Array.from({ length: 5 }, (_, index) => index + 1);
  }

  rate(stars: number) {
    this.selectedRating = stars;
  }

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.modalidadesUsuario = user.modalidades || [];
        if (this.modalidadesUsuario.length === 0) {
          this.metasEsportivas = [];
        }
        this.loadMetasDiarias();
        this.loadMetasEsportivas();
        this.obterMediaAvaliacao();
      } else {
        console.error('Usuário não autenticado');
      }
    });

    this.authService.loadToken().subscribe({
      next: () => {
        const user = this.authService.getUser();
        if (user) {
          this.user = user;
          this.modalidadesUsuario = this.user.modalidades || [];
          if (this.modalidadesUsuario.length === 0) {
            this.metasEsportivas = [];
          }
          this.loadMetasDiarias();
          this.loadMetasEsportivas();
          this.obterMediaAvaliacao();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar token ou dados do usuário:', err);
      },
    });
  }

  goToPage(path: string): void {
    this.router.navigate([path]);
  }

  getModalidadeName(idModalidade: number): string | undefined {
    const modalidade = this.modalidadesUsuario.find(
      (m) => m.idModalidade === idModalidade
    );
    return modalidade ? modalidade.nomeModalidade : undefined;
  }

  loadMetasDiarias(): void {
    if (!this.user) return;

    this.metaDiariaService
      .getMetaDiariaByAcademicoId(this.user.idAcademico)
      .subscribe({
        next: (data: MetaDiaria[] | null) => {
          if (data === null) {
            this.metasDiarias = [];
          } else {
            this.metasDiarias = data;
          }
        },
        error: (err) => {
          console.error('Erro ao buscar meta diária:', err);
        },
      });
  }

  loadMetasEsportivas(): void {
    if (!this.user || this.modalidadesUsuario.length === 0) return;

    const observables = this.modalidadesUsuario.map((modalidade) =>
      this.metaEsportivaService.getMetasPorModalidade(modalidade.idModalidade)
    );

    forkJoin(observables).subscribe({
      next: (resultados) => {
        this.metasPorModalidade2 = resultados
          .flat()
          .filter((meta): meta is MetaEsportiva => meta !== null)
          .reduce<{
            [key: number]: {
              idModalidadeEsportiva: number;
              metas: MetaEsportiva[];
            };
          }>((acc, meta) => {
            const modalidadeId = meta.idModalidadeEsportiva;
            if (!acc[modalidadeId]) {
              acc[modalidadeId] = {
                idModalidadeEsportiva: modalidadeId,
                metas: [],
              };
            }
            acc[modalidadeId].metas.push(meta);
            return acc;
          }, {});

        this.metasPorModalidadeArray = Object.values(this.metasPorModalidade2);
      },
      error: (err) => {
        console.error('Erro ao buscar metas esportivas:', err);
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
