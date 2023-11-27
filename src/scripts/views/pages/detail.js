import UrlParser from '../../routes/url-parser';
import DataSource from '../../data/data-source';
import { recipeDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="recipe" class="recipe"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const recipe = await DataSource.detailRecipe(url.id);
    console.log(recipe);
    const movieContainer = document.querySelector('#recipe');
    movieContainer.innerHTML = recipeDetailTemplate(recipe);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      recipe: {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        city: recipe.city,
        address: recipe.address,
        pictureId: recipe.pictureId,
        categories: recipe.categories,
        menus: recipe.menus,
        rating: recipe.rating,
        customerReviews: recipe.customerReviews,
      },
    });
  },
};

export default Detail;
