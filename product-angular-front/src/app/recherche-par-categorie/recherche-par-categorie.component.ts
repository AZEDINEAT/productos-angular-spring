import { Component, OnInit } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  templateUrl: './recherche-par-categorie.component.html'

})
export class RechercheParCategorieComponent implements OnInit{
  produits! : Produit[];
  IdCategorie! : number;
  categories! : Categorie[];

 constructor(private produitService:ProduitService){}


  ngOnInit(): void {
   this.produitService.listeCategories().subscribe(C=>{this.categories=C._embedded.categories
    console.log(C);}
    );
  }
  onChange(){
      this.produitService.rechercherParCategorie(this.IdCategorie).subscribe(
        (prods)=>{console.log(prods);
        this.produits=prods;
      }
      )

  }
  




}
