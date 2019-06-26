/*
Suppose that you're working in a small town administration, and
you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 
4 streets. All parks and streets have a name and build year.

At an end-of-year meeting, your boss wants a final report with 
the following:

1. Tree density of each park in the town
(formula: number of trees/park area)
2. Average age of each town's park 
(formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: 
tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console. 

HINT: Use some of the ES6 festures: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc...
*/ 

// super class for all town places. Basically takes all the data common to all places

class TownPlace {
    constructor (yearOfBuild, name) {
        this.yearOfBuild = yearOfBuild;
        this.name = name;
    }
};

// subclass for each park. takes additionally area in km2 and number of total trees

class Park extends TownPlace  {
    constructor (yearOfBuild, name, area, treeNum) {
        super(yearOfBuild, name); 
        this.area = area;
        this.treeNum = treeNum;
    }

    calculateTreeDensity(treeNum, area) {
        const density = treeNum / area;
        return density;
    }

    calculateAge(yearOfBuild) {
        const age = new Date().getFullYear() - yearOfBuild;
        return age;
    }

    // add all obj instances of all Parks. Get the year of build for each and create a map with name and date for each park
    createMapParkAges (...objsArr) {
        let AgesMap = new Map();
        for (const obj of objsArr) {
            const age = this.calculateAge(obj.yearOfBuild);
            //console.log(age);
            //console.log(obj);
            AgesMap.set(obj.name, age);
            //console.log(AgesMap);
        }
        return AgesMap;
    }

    createMapParkTrees (...objsArr) {
        let TreeNumMap = new Map();
        for (const obj of objsArr) {
            //console.log(obj);
            TreeNumMap.set(obj.name, obj.treeNum);
            //console.log(TreeNumMap);
        }
        return TreeNumMap;
    }

    avgParksAge(map) {
        let totalAges = 0;
        for (let [name, age] of map.entries()) {
            totalAges = totalAges + age;
        }
        const avgAge = totalAges / map.size;
        return avgAge;
    }

    moreThousandTrees (map) {
        let park = 'No park!';
        for (let [name, treeNum] of map.entries()) {
            if (treeNum > 1000) {
                park = name;
            }
        }
        return park;
    }

    logResults = (more1000Tree, avgAge, ...parksArr) => {
        const avgAgeLog = `Our 3 parks have an average age of ${avgAge} years.`;
        const more1000TreeLog = `${more1000Tree} has more than a 1000 trees.`;
        console.log('--------------------PARKS REPORT-----------------------');
        console.log(avgAgeLog);
        for (const obj of parksArr) {
            const parkDensityLog = `${obj.name} has a tree density of ${this.calculateTreeDensity(obj.treeNum, obj.area)} per square km.`;
            console.log(parkDensityLog);
        }
        console.log(more1000TreeLog);
    }
}

// subclass for each street. takes additionally length in km and size classification

class Street extends TownPlace {
    constructor (yearOfBuild, name, length, sizeClass = 'normal') {
        super(yearOfBuild, name);
        this.length = length;
        this.sizeClass = sizeClass;
    }

    streetLengthMap(...objsArr) {
        let streetLengthMap = new Map();
        for (const obj of objsArr) {
            //console.log(obj);
            streetLengthMap.set(obj.name, obj.length);
            //console.log(streetLengthMap);
        }
        return streetLengthMap;
    }

    calculateAvgLength = (numStreets, totalLength) => totalLength / numStreets;

    calculateTotalLength(map) {
        let totalLength = 0;
        for (let [name, length] of map.entries()) {
            totalLength = totalLength + length;
        }
        return totalLength;
    }

    logResults = (totalLength, avgStreetLength, ...streetsArr) => {
        const totalAvgLenghtLog = `Our 4 streets have a total length of ${totalLength} km, with an average of ${avgStreetLength} km.`;
        console.log('--------------------STREETS REPORT-----------------------');
        console.log(totalAvgLenghtLog);
        for (const obj of streetsArr) {
            const streetLengthLog = `${obj.name}, build in ${obj.yearOfBuild}, is a ${obj.sizeClass} street.`;
            console.log(streetLengthLog);
        }
    }

}


// Parks related calculations
const park1 = new Park(1980, "Indiana Park", 5, 800);
const park2 = new Park(1975, "Pizza Park", 3, 500);
const park3 = new Park(2000, "Feel Good Park", 10, 3000);

parkAgesMap = park1.createMapParkAges(park1, park2, park3);
avgAge = park1.avgParksAge(parkAgesMap);
parkTreeNumMap = park1.createMapParkTrees(park1, park2, park3);
parkMore1000Tree = park1.moreThousandTrees(parkTreeNumMap);

//console.log(park1);
//console.log(park2);
//console.log(park3);
//console.log(treeDensityPark1);
//console.log(treeDensityPark2);
//console.log(treeDensityPark3);
//console.log(parkAgesMap);
//console.log(avgAge);
//console.log(parkTreeNumMap);
//console.log(parkMostTree);

// Streets related calculations

const street1 = new Street(2000, "Happy Street", 0.5);
const street2 = new Street(2010, "Old Fountain Street", 0.8, 'small');
const street3 = new Street(1999, "Circle Street", 2, 'huge');
const street4 = new Street(1985, "Long Street", 1.5, 'big');

const streetLengthMap = street1.streetLengthMap(street1, street2, street3, street4);
const totalLength = street1.calculateTotalLength(streetLengthMap);
const avgStreetLength = street1.calculateAvgLength(streetLengthMap.size, totalLength);

//console.log(street1);
//console.log(street2);
//console.log(street3);
//console.log(street4);
//console.log(streetLengthMap);
//console.log(totalLength);
//console.log(avgStreetLength);

// Results presentation 

park1.logResults(parkMore1000Tree, avgAge, park1, park2, park3);
street1.logResults(totalLength, avgStreetLength, street1, street2, street3, street4);
