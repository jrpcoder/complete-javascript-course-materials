// Global app controller
import Search from './models/Search';
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/SearchView';

/**Global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();
    console.log(query);

    if(query) {
        // 2) new search object and add it to state
        state.search = new Search(query);
        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResults);

        // 4) search for recipes
        await state.search.getResults();
        
        // 5) render results on UI
        clearLoader();
        searchView.renderRecipes(state.search.recipes);
    }
    
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderRecipes(state.search.recipes, goToPage);
    }
});

