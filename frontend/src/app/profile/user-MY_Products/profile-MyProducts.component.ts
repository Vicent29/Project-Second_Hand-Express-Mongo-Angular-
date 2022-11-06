import { Component, OnInit } from '@angular/core';
import { ProductService, Product, UserService, User, Profile } from '../../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-MyProducts.component.html',
  styleUrls: ['./profile-MyProducts.component.css'],
})
export class ProfileProductsComponent implements OnInit {
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  products: {
    slug: string;
    prod_nom: string;
    price: string;
    img_prod: string;
    author: string;
  }[] = [];

  constructor(
    private ProductService: ProductService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.profile = data['profile']['user'] as Profile;  
        this.getProducts();
      },
      error: (e) => console.error(e),
    }); //get profile
  }

  getProducts() {
    this.ProductService.all_products_user(this.profile.email).subscribe({
      next: (data) => {
        let newdata = JSON.parse(JSON.stringify(data));
        for (let row in data) {
          this.products.push({
            slug: newdata[row].slug,
            prod_nom: newdata[row].prod_nom,
            price: newdata[row].price,
            img_prod: newdata[row].img_prod[0],
            author: newdata[row].author,
          });
        }
      },
      error: (error) => console.error(error),
    });
  } //getProducts
}
