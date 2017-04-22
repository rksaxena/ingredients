/**
 * Created by 8321 on 4/22/17.
 */

const csvFilePath='./src/data/ingredients.csv';
const csv=require('csvtojson');
let ingredients_json = [];
import _ from 'underscore';

csv()
    .fromFile(csvFilePath)
    .on('json',(jsonObj)=>{
        logger.debug(JSON.stringify(jsonObj));
        ingredients_json.push(jsonObj);
    })
    .on('done',(error)=>{

    });

module.exports = {
    get_nutrient_value : (recipe) => {
        /* Find the nutrients in existent list */
        let ingredient_value = {
            'protien' : 0,
            'carbs' : 0,
            'fat' : 0,
            'fibre' : 0
        }
        for (var key in recipe) {
            if (recipe.hasOwnProperty(key)) {
                let r = _.find(ingredients_json, function(item) {
                    return item.name == recipe[key];
                });
                if (r != undefined){
                    ingredient_value['protien'] += r['protein'];
                    ingredient_value['carbs'] += r['carbs'];
                    ingredient_value['fat'] += r['fat'];
                    ingredient_value['fibre'] += r['fibre'];
                }
            }
        }
    },
    missing_ingredients: (recipe) =>{
        /* Find missing ingredients */
        let missing_ingredients_list = [];
        for (var key in recipe) {
            if (recipe.hasOwnProperty(key)) {
                let r = _.find(ingredients_json, function(item) {
                    return item.name == recipe[key];
                });
                if (r == undefined){
                    missing_ingredients_list.push(recipe[key]);
                }
            }
        }
        return missing_ingredients_list;

    },
    add_nutrient_value : (item, protien, carb, fat, fiber) => {
        /* Update the nutrients */
        ingredients_json.push({
            'name' : item,
            'protein' : protien,
            'carb': carb,
            'fat': fat,
            'fiber' : fiber
        })
    }

}

