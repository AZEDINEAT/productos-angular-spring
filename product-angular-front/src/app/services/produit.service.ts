import { Injectable } from '@angular/core';
import { Categorie } from '../model/categorie.model';
import { Produit } from '../model/produit.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { CategorieWrapper } from '../model/categoriewrapped.model';
import { AuthService } from './auth.service';


const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  produits! : Produit[];

  apiURLCat: string = 'http://localhost:8080/cat';
  
  /* categories : Categorie[];  */
  constructor(private http : HttpClient,private authService:AuthService) { 
                        }
  listeProduit(): Observable <Produit[]>{
    
    return this.http.get<Produit[]>(apiURL + "/all");
   }
   
   ajouterProduit( prod: Produit):Observable<Produit>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.post<Produit>(apiURL, prod, {headers:httpHeaders});
    }

    supprimerProduit(id : number) {
      
      const url = `${apiURL}/${id}`;
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.delete(url, {headers:httpHeaders});
      }
      

  
  consulterProduit(id: number): Observable<Produit> {
    const url = `${apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<Produit>(url,{headers:httpHeaders});
    }

    updateProduit(prod :Produit) : Observable<Produit> {
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.put<Produit>(apiURL, prod, {headers:httpHeaders});
      }



trierProduits(){
this.produits = this.produits.sort((n1,n2) => {
  if (n1.idProduit!> n2.idProduit!){
  return 1;
  }
  if (n1.idProduit! < n2.idProduit!) {
  return -1;
  }
  return 0;
  });
  }
  

 /*  listeCategories():Observable<Categorie[]> {
    return this.http.get<Categorie[]>(apiURL+"/cat");
  } */
  listeCategories():Observable<CategorieWrapper>{
    let jwt = this.authService.getToken();
    jwt = "Bearer "+jwt;
    let httpHeaders = new HttpHeaders({"Authorization":jwt})
    return this.http.get<CategorieWrapper>(this.apiURLCat,{headers:httpHeaders});
    } 

 /* consulterCategorie(id:number): Categorie{
    return this.categories.find(cat => cat.idCat == id)!;
  }  */ 
  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `http://localhost:8080/api/prodsCat/${idCat}`;
    return this.http.get<Produit[]>(url);
    
  }

  rechercherParNom(nom: string):Observable< Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
    }
    
  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(this.apiURLCat, cat, httpOptions);
  }
      



}



