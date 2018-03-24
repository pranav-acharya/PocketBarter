

export const savedProductsList = [{
    "product": {
        "prd_uuid": "d7194daa-4ff3-426f-98f0-13e0ef02947f",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Test",
        "price": "$100.00",
        "description": "Asdfasdfasdf",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "music",
        "thumbnail":"19632abc-e07c-44df-a392-1d88d12c49f8.jpg",
        "created_at": "2018-02-17T20:31:45+05:30"
    },
    "inventory": null,
    "photos": [],
    "distance": 0
}, {
    "product": {
        "prd_uuid": "fff9f025-c588-426a-9fde-720901c76758",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Pranav’s Product",
        "price": "$100.00",
        "description": "A product by Pranav",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "music",
        "thumbnail":"8e808357-858f-4abb-9dc3-f1ec2f90837a.jpg",
        "created_at": "2018-02-19T11:41:42+05:30"
    },
    "inventory": null,
    "photos": [],
    "distance": 0
}];

export const categories = [
    {
        name:'All',
        icon:'ios-help-outline',
        value:'all',
        categoryId:0
    },
    {
        name:'Music',
        icon:'ios-musical-notes',
        value:'music',
        categoryId:1
    },
    {
        name:'Books',
        icon:'md-book',
        value:'books',
        categoryId:2
    },
    {
        name:'Sports',
        icon:'md-football',
        value:'sports',
        categoryId:3
    },
    {
        name:'Camera',
        icon:'md-camera',
        value:'photography',
        categoryId:4
    }

];
export const productDetailNew = {
    "product": {
        "prd_uuid": "d7194daa-4ff3-426f-98f0-13e0ef02947f",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Test",
        "price": "$100.00",
        "description": "Asdfasdfasdf",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "music",
        "thumbnail": "19632abc-e07c-44df-a392-1d88d12c49f8.jpg",
        "created_at": "2018-02-17T20:31:45+05:30"
    },
    "inventory": null,
    "photos": [],
    "distance": 0,
    "saved": true
}

export const productDetail = {
    uri:"https://batandballgame.com/wp-content/uploads/2016/04/best-baseball-bat-reviews.jpg",
    name:"Baseball bat",
    owner:{
        name:"Harry",
        uri:"https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png",
        rating:2.6,
        reviewCount:428
    },
    location:"San Jose, CA",
    distance:2,
    dailyRate:"$9.99",
    weeklyDiscount:"30%",
    monthlyDiscount:"40%",
    weeklyRate:"$29.99",
    about:"Condition-new\nDexterity-Right Hand\nBrand-Titleist",
    reviews:[
        {
            title:"What is Lorem Ipsum",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            rating:3.5
        },
        {
            title:"Why do we use it",
            description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            rating:2
        },
        {
            title:"Where can I get some",
            description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. e",
            rating:1
        },
        {
            title:"Where does it come from",
            description:"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
            rating:1
        }
    ]
};

export const userDetails = {
    avatarUri:"https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png",
    name:"Harry",
    location:"Palo Alto, CA",
    reviewCount:428,
    rating:2.6,
    about:"Hi everyone,\n\n Lorem ipsum dolor sit amet",
    membershipPeriod:2015,
    responseTime:2,
    verifiedInformation:["Phone Number","Email address","valid user ID"],
    userReviews:321,
    products:{
        listed:[],
        rented:[]
    }

}

export const productsAndUsersResponse = {
    "prodAndUserInfoList": [
        {
            "prod_info": {
                "product": {
                    "prd_uuid": "SENDER_ID",
                    "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
                    "name": "New product",
                    "price": "$100.00",
                    "description": "Hello world",
                    "location": {
                        "address": null,
                        "location": {
                            "latitude": "37.785834",
                            "longitude": "-122.406417",
                            "radius": ""
                        }
                    },
                    "category": "books",
                    "created_at": "2018-02-06T15:42:36+05:30"
                },
                "inventory": null,
                "thumbnail": {
                    "photo_url": "4a3d8053-5f26-408f-b778-b01aa51dddc8.jpg"
                },
                "photos": []
            },
            "user_info": {
                "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
                "fname": "Pranav",
                "lname": "Acharya",
                "email": "pranavacharya432@gmail.com",
                "mobile": "9686900211",
                "location": {
                    "address": {
                        "address_street": "",
                        "address_street_2": "",
                        "city": "",
                        "state": "",
                        "zip": "",
                        "country": ""
                    },
                    "location": {
                        "latitude": "",
                        "longitude": "",
                        "radius": ""
                    }
                },
                "created_on": "2018-02-06T15:27:23+05:30",
                "thumbnail": ""
            }
        }
    ]
}
export const allProductsList = [{
    "product": {
        "prd_uuid": "7130c1d5-7282-4673-b0fa-6d2f3fa8455e",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "New product",
        "price": "$100.00",
        "description": "Hello world",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "books",
        "thumbnail":"4a3d8053-5f26-408f-b778-b01aa51dddc8.jpg",
        "created_at": "2018-02-06T15:42:36+05:30"
    },
    "inventory": {
        "product_id": "7130c1d5-7282-4673-b0fa-6d2f3fa8455e",
        "availability": {
            "dates": ["2018-01-31", "2018-02-01", "2018-02-07", "2018-02-08"]
        },
        "rates": [{
            "type": "DAILY",
            "amount": "100",
            "currency": "RESERVED"
        }],
        "active": true,
        "created_at": "1517911955520",
        "updated_at": "1517911955520"
    },
    "photos": [],
    "distance": 0
}, {
    "product": {
        "prd_uuid": "d7194daa-4ff3-426f-98f0-13e0ef02947f",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Test",
        "price": "$100.00",
        "description": "Asdfasdfasdf",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "music",
        "thumbnail":"19632abc-e07c-44df-a392-1d88d12c49f8.jpg",
        "created_at": "2018-02-17T20:31:45+05:30"
    },
    "inventory": {
        "product_id": "d7194daa-4ff3-426f-98f0-13e0ef02947f",
        "availability": {
            "dates": ["2018-02-08", "2018-02-09"]
        },
        "rates": [{
            "type": "DAILY",
            "amount": "100",
            "currency": "RESERVED"
        }],
        "active": true,
        "created_at": "1518879704626",
        "updated_at": "1518879704626"
    },
    "photos": [],
    "distance": 0
}, {
    "product": {
        "prd_uuid": "08e15a0c-4f0d-4d51-8135-2c9994d0444f",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Another product",
        "price": "$100.00",
        "description": "Test",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "photography",
        "thumbnail":"318a63ce-7b34-46cb-ad18-65ea837218ea.jpg",
        "created_at": "2018-02-17T20:44:12+05:30"
    },
    "inventory": {
        "product_id": "08e15a0c-4f0d-4d51-8135-2c9994d0444f",
        "availability": {
            "dates": ["2018-02-08", "2018-02-09", "2018-02-12", "2018-02-14", "2018-02-13"]
        },
        "rates": [{
            "type": "DAILY",
            "amount": "100",
            "currency": "RESERVED"
        }],
        "active": true,
        "created_at": "1518880452075",
        "updated_at": "1518880452075"
    },
    "photos": [],
    "distance": 0
}, {
    "product": {
        "prd_uuid": "fff9f025-c588-426a-9fde-720901c76758",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Pranav’s Product",
        "price": "$100.00",
        "description": "A product by Pranav",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "music",
        "thumbnail":"8e808357-858f-4abb-9dc3-f1ec2f90837a.jpg",
        "created_at": "2018-02-19T11:41:42+05:30"
    },
    "inventory": {
        "product_id": "fff9f025-c588-426a-9fde-720901c76758",
        "availability": {
            "dates": ["2018-02-01", "2018-02-02", "2018-02-03", "2018-02-08", "2018-02-09"]
        },
        "rates": [{
            "type": "DAILY",
            "amount": "100",
            "currency": "RESERVED"
        }],
        "active": true,
        "created_at": "1519020702277",        
        "updated_at": "1519020702277"
    },
    "photos": [],
    "distance": 0
}, {
    "product": {
        "prd_uuid": "fd0fc838-0da4-4fc9-a754-d5d6d9ddcafc",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Another product ",
        "price": "$100.00",
        "description": "Test Product",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "books",
        "thumbnail":"6a422c79-3a73-462d-bdbb-f1b83d63ec89.jpg",
        "created_at": "2018-02-19T11:49:41+05:30"
    },
    "inventory": {
        "product_id": "fd0fc838-0da4-4fc9-a754-d5d6d9ddcafc",
        "availability": {
            "dates": ["2018-02-01", "2018-02-02"]
        },
        "rates": [{
            "type": "DAILY",
            "amount": "100",
            "currency": "RESERVED"
        }],
        "active": true,
        "created_at": "1519021180935",
        "updated_at": "1519021180935"
    },
    "photos": [],
    "distance": 0
}, {
    "product": {
        "prd_uuid": "ecb23623-23b5-4f99-97c9-984ca031d9c3",
        "user_uuid": "b2e02e26-8bd8-481d-8f81-024e785759f4",
        "name": "Latest Product",
        "price": "$100.00",
        "description": "This is the latest product",
        "location": {
            "address": null,
            "location": {
                "latitude": "37.785834",
                "longitude": "-122.406417",
                "radius": ""
            }
        },
        "category": "music",
        "thumbnail":"669ee413-7605-4337-b86c-b3f4ac4b9920.jpg",
        "created_at": "2018-02-27T10:50:34+05:30"
    },
    "inventory": {
        "product_id": "ecb23623-23b5-4f99-97c9-984ca031d9c3",
        "availability": {
            "dates": ["2018-02-02", "2018-02-03", "2018-02-04", "2018-02-05", "2018-02-06", "2018-02-08", "2018-02-07"]
        },
        "rates": [{
            "type": "DAILY",
            "amount": "100",
            "currency": "RESERVED"
        }],
        "active": true,
        "created_at": "1519708833548",
        "updated_at": "1519708833548"
    },
    
    "photos": [],
    "distance": 0
}];
export const loggedInUserProfile = {
    listed:12,
    rented:123,
    something:123,
    "user_uuid":"b2e02e26-8bd8-481d-8f81-024e785759f4",
    "fname":"Pranav",
    "lname":"Acharya",
    "email":"pranavacharya432@gmail.com",
    "mobile":"9686900211",
    "location":{"address":{"address_street":"","address_street_2":"","city":"","state":"","zip":"","country":""},"location":{"latitude":"","longitude":"","radius":""}},
    "created_on":"2018-02-06T15:27:23+05:30",
    "thumbnail":"c7d8bdc8-8a05-4125-be59-7a86a03001d4.jpg"
    
};

export const alerts = [
    {
        uri:"https://usercontent2.hubstatic.com/12556463_f496.jpg",
        time:"Fri at 3:45pm",
        title:"New violin posted near you",
        priceRange: {
            start:"$15",
            end:"$50"
        },
        distanceInMiles:0.4,
        visited:true
    },
    {
        uri:"https://usercontent2.hubstatic.com/12556463_f496.jpg",
        time:"Fri at 3:45pm",
        title:"New violin posted near you",
        priceRange: {
            start:"$15",
            end:"$50"
        },
        distanceInMiles:0.4,
        visited:true
    },
    {
        uri:"https://usercontent2.hubstatic.com/12556463_f496.jpg",
        time:"Fri at 3:45pm",
        title:"New violin posted near you",
        priceRange: {
            start:"$15",
            end:"$50"
        },
        distanceInMiles:0.4,
        visited:false
    },
    {
        uri:"https://usercontent2.hubstatic.com/12556463_f496.jpg",
        time:"Fri at 3:45pm",
        title:"New violin posted near you",
        priceRange: {
            start:"$15",
            end:"$50"
        },
        distanceInMiles:0.4,
        visited:false
    },
    {
        uri:"https://usercontent2.hubstatic.com/12556463_f496.jpg",
        time:"Fri at 3:45pm",
        title:"New violin posted near you",
        priceRange: {
            start:"$15",
            end:"$50"
        },
        distanceInMiles:0.4,
        visited:true
    }

];

export const messages = [
    {
        from:{
            username:"George",
            avatar_uri:"uri"
        },
        messageText:"Hi, I am interested in your Guitar...",
        visited:true,
        time:"10:30 AM"
    },
    {
        from:{
            username:"George",
            avatar_uri:"uri"
        },
        messageText:"Hi, I am interested in your Guitar...",
        visited:false,
        time:"10:30 AM"
    },
    {
        from:{
            username:"George",
            avatar_uri:"uri"
        },
        messageText:"Hi, I am interested in your Guitar...",
        visited:false,
        time:"10:30 AM"
    },
    {
        from:{
            username:"George",
            avatar_uri:"uri"
        },
        messageText:"Hi, I am interested in your Guitar...",
        visited:true,
        time:"10:30 AM"
    },
    {
        from:{
            username:"George",
            avatar_uri:"uri"
        },
        messageText:"Hi, I am interested in your Guitar...",
        visited:false,
        time:"10:30 AM"
    }
];