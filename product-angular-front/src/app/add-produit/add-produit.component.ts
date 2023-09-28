import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html'
  
})
export class AddProduitComponent implements OnInit{
  categories! : Categorie[];
  newIdCat! : number;
  newCategorie! : Categorie;
  
  newProduit=new Produit();

   constructor(private produitService:ProduitService,private rout:Router){
   }


  ngOnInit(): void {
   this.produitService.listeCategories().subscribe(
    (c)=>this.categories=c._embedded.categories
   ); 
  }
  
   addProduit(){
    this.newProduit.categorie=this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit).subscribe(p=>{
      console.log(p);
      this.rout.navigate(["produits"]);
    });
     
   }
   
}
