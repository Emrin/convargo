'use strict';


//alert("Hello");
console.log(5+1);

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

//var shippingPrice = deliveries.distance*truckers.pricePerKm + deliveries.volume*truckers.pricePerVolume;

//for (sample in deliveries){alert("AAAA");}

// for each delivery
for (var i = 0; i < deliveries.length; i++){
    var obj = deliveries[i];
    var price = 0;
    var sale = 1;
    var commission = 0;
    var treasury = 0;
    var convargo = 0;
    var deductibles = 0;

    // find corresponding trucker
    for (var j = 0; j < truckers.length; j++){
        if (deliveries[i].truckerId === truckers[j].id){
          if (deliveries[i].volume > 5){
            sale = 0.1;
            if (deliveries[i].volume > 10){
              sale = 0.7;
              if (deliveries[i].volume > 25){
                sale = 0.5;
              }
            }
          }
          price = deliveries[i].distance*truckers[j].pricePerKm + deliveries[i].volume*truckers[j].pricePerVolume
          alert("Before offer: " + price);
          price = price*sale;
          alert("After offer: " + price);
          deliveries[i].price = price;
          console.log(price);

          if (deliveries[i].options.deductibleReduction){
            deductibles = deliveries[i].volume;
            price = price + deductibles;
            alert("Deductible detected: " + deductibles);
          }


          commission = price*0.3;
          treasury = Math.round(deliveries[i].distance/500)+1;
          convargo = commission*0.5 - treasury;

          deliveries[i].commission.insurance = commission*0.5;
          deliveries[i].commission.treasury = treasury;
          deliveries[i].commission.convargo = convargo;

          alert("Commision = " + commission);
          alert("Treasury = " + treasury);
          alert("Convargo = " + convargo);

          // paying the actors
          actors[i].payment[0].amount = price;
          actors[i].payment[1].amount = price - commission;
          actors[i].payment[2].amount = commission*0.5;
          actors[i].payment[3].amount = treasury;
          actors[i].payment[4].amount = convargo + deductibles;
          alert("Shipper:" + actors[i].payment[0].amount);
          alert("Trucker:"+ actors[i].payment[1].amount);
          alert("Insurance:"+ actors[i].payment[2].amount);
          alert("Treasury:"+ actors[i].payment[3].amount);
          alert("Convargo:"+ actors[i].payment[4].amount);


        }
    }
}
alert("Exit");


console.log(truckers);
console.log(deliveries);
console.log(actors);
