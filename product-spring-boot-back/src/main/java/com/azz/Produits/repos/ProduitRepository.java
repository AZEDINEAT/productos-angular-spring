
package com.azz.produits.repos;

import com.azz.Produits.entities.Produitprojection;
import com.azz.produits.entities.Categorie;
import com.azz.produits.entities.Produit;
import com.fasterxml.jackson.annotation.JsonView;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;




@RepositoryRestResource(path ="produit")
public interface ProduitRepository extends JpaRepository<Produit, Long> {
   
  
    List<Produit> findByNomProduit(String n);
    List<Produit> findByNomProduitContains(String n);
    List<Produit> findByNomProduitLike(String n);
	
	/*@Query("select p from Produit p where p.nomProduit like %?1 and p.prixProduit > ?2")
	List<Produit> findByNomPrix (String nom, Double prix);*/
	
	@Query("select p from Produit p where p.nomProduit like %:nom and p.prixProduit > :prix")
	List<Produit> findByNomPrix (@Param("nom") String nom,@Param("prix") Double prix);

	@Query("select p from Produit p where p.categorie = ?1")
	List<Produit> findByCategorie (Categorie categorie);
	
	List<Produit> findByCategorieIdCat(Long id);
	
	List<Produit> findByOrderByNomProduitAsc();
	
	@Query("select p from Produit p order by p.nomProduit ASC, p.prixProduit DESC")
	List<Produit> trierProduitsNomsPrix ();
}
