package com.azz.Produits;

import com.azz.produits.entities.Categorie;
import com.azz.produits.entities.Produit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

@SpringBootApplication
public class ProduitsApplication implements CommandLineRunner{
        
     @Autowired 
     RepositoryRestConfiguration rep;
     
	public static void main(String[] args) {
		SpringApplication.run(ProduitsApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        rep.exposeIdsFor(Produit.class,Categorie.class);
    }

}
