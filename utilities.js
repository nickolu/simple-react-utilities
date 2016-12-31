
/*****************
 * ARRAY METHODS *
 *****************/

/**
 * if given a name property and an array containing objects which each have a name property, 
 * will return the first object with the matching name
 * 
 * @param  {array} arr  [array of objects]
 * @param  {string} name [name property in object]
 * @return {object}      [first object matching the name provided]
 */
export const getObjectByName = function(arr,name) {
  let i = 0;
  for (i in arr) {
    if ('name' in arr[i]) {
      if (arr[i].name === name) {
        return arr[i];
      }
    }
   }
  return false;
};

/**
 * if given an array containing objects, a property name, and a value,
 * will return an array of objects each which contain the supplied property name and value 
 * 
 * @param  {array} arr  [description]
 * @param  {string} prop [description]
 * @param  {string} val  [description]
 * @param  {string} usePartialMatch  [description]
 * @return {array}      [array of objects matching search criteria]
 */
export const getObjectsByProp = function(arr,propName,val,usePartialMatch) {
  let i = 0;
  let objects = [];
  let _this = this;

  function checkPartialMatch(str1,str2) {
    return usePartialMatch && _this.shrink(str1).indexOf(_this.shrink(str2)) > -1;
  }
  for (i in arr) {
    if (propName in arr[i]) {
      if (arr[i][propName] === val || checkPartialMatch(arr[i][propName],val)) {
        objects.push(arr[i]);
      }
    }
  }
  return objects;
};

/**
 * counts the number of times an value is in an array
 * @param  {array} arr  [array to search]
 * @param  {string} item [value to search for]
 * @return {number}      [number of times the value appears in the array]
 */
export const countItemInArray = function(arr,item) {
  let l = arr.length;
  let i = 0;
  let count = arr.indexOf('count') > -1 ? 1 : 0;
  let arrSort = arr.sort();

  for (i = 0; i < l; i += 1) {
    if (arrSort[i] === item) {
      count += 1;
    } else if (count > 0) {
      break;
    }
  }

  return count;
}

/**
   * gets a list with the specified object removed
   * @param  {array} arr  [array to remove an item from]
   * @param  {object} obj [specific object to remove]
   * @return {array}      [new array without the specified object]
   */
export const removeObject = function(arr,obj) {
  var i;
  var l = arr.length;
  var prop;

  for (i=0; i<l; i+=1) {
    if (arr[i] && arr[i].value === obj.value && arr[i].key === obj.key) {
      arr.splice(i,1);
    }
  }

  return arr;
}

/**
 * removes duplicates from an array and returns the new array
 * @param  {array} array [array to remove duplicates from]
 * @return {array}       [array with duplicates removed]
 */
export const arrayUnique = function(arr) {
    var a = arr.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

/**
 * takes an array of objects and sorts them by a specified property
 * @param  {array} objects [list of objects]
 * @return {array}         [list of objects, sorted by given property]
 */
export const sortObjectsByProp = function (objects,prop) {
  var i;
  var l = objects.length;
  var propsArray = [];
  var newObjectSort = [];

  for (i=0; i<l; i+=1) {
    propsArray.push(objects[i][prop]);
  }

  propsArray.sort();

  for (i=0, l=propsArray.length; i<l; i+=1) {
    newObjectSort.push(getObjectByName(objects,propsArray[i]));
  }

  return newObjectSort;
}

/**
 * gets an array which is the property of an object in an array of objects, optionally returning it as a string
 * @param  {array} spells     [array of spell objects]
 * @param  {boolean} string   [true if expected return type is a string]
 * @return {array || string}  [array of classes, or string of classes joined by commas]
 */
export const getArrayFromObject = function(data,key,returnString) {
  var items = [];
  for (var prop in data[key]) {
    items.push(prop);
  }
  if (!returnString) {
    return items
  } else {
    return items.join(', ');
  }
}

/**
 * checks if an object has a specific string
 * @param  {object} obj [object to check]
 * @param  {string} val [value to check for]
 * @return {boolean}     whether or not the object has the value
 */
export const contains = function(obj,val) {
  if (obj.indexOf) {
    return obj.indexOf(val) > -1 ? true : false;
  }
}

/******************
 * STRING METHODS *
 ******************/

/**
 * converts a string from any case to Title Case
 * @param  {string} str 
 * @return {string}     [string in title case]
 */
export const titleCase = function(str) {
  str = str.replace(/_/gi,' ');
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  str = str.join(' ').replace(/Of/gi, 'of')
    .replace(/The/gi, 'the')
    .replace(/In/gi, 'in')
    .charAt(0).toUpperCase() + str.slice(1);

  return str;
}

/**
 * removes spaces and converts a string to lowercase for easier matching
 * @param  {string} str [string to shrink]
 * @return {string}     [shrunken string]
 */
export const shrink = function(str) {
  var myStr = str;
  return myStr.replace(/\s/g, '').toLowerCase();
}

/**
 * gets a modifier value for a D&D ability score
 * @param  {number} score [ability score]
 * @return {string}       [modifier]
 */
export const getModifier = function(score) {
  let modifier = Math.floor((score - 10)/2);
  let operator = "+"
  if (modifier < 0) {
    operator = "-";
  }
  return operator+""+Math.abs(modifier);
};


/**************************
 * D&D FORMULAS & METHODS *
 **************************/

/**
 * gets the ability score modifier for given ability score
 * @param  {number} num Ability Score for which to get modifier
 */
export const getAbilityScoreModifier = function(num) {
  return Math.floor((num - 10) / 2);
}
