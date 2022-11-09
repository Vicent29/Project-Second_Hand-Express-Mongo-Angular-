import { Component, OnInit } from '@angular/core';
import {
  ProductService,
  Product,
  UserService,
  User,
  Profile,
} from '../../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-FavProducts',
  templateUrl: './profile-FavProducts.component.html',
  styleUrls: ['./profile-FavProducts.component.css'],
})
export class ProfileFavProductsComponent implements OnInit {
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  products: {
    slug: string;
    prod_nom: string;
    price: string;
    img_prod: string;
    author: string;
  }[] = [];
  listProducts: Product [] = [];
  emit : String[] = []
 
  constructor(
    private ProductService: ProductService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.profile = data['profile']['user'] as Profile;
        this.getFavProducts();
      },
      error: (e) => console.error(e),
    }); //get profile
  }

  getFavProducts() {
    this.ProductService.fav_products_user(this.profile.email).subscribe({
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
        this.listProducts = this.products;
        this.getHighlight(this.profile);
      },
      error: (error) => console.error(error),
    });
  } //getProducts

  getHighlight(user: Profile) {
    console.log(user.email);

    this.ProductService.fav_products_user(user.email).subscribe({
      next: (alldata) => {
      

        let slugs: Product[] = []
        alldata.map(data => { slugs.push(data.slug) })
        this.listProducts.map(product => {
          if (slugs.indexOf(product.slug) == -1) {
            product['favorited'] = false
          } else {
            product['favorited'] = true
          }
        })
        this.emit = JSON.parse(JSON.stringify(this.listProducts))
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onToggleFavorite(favorited: boolean, product: Product) {
    product['favorited'] = favorited;
  }
}
