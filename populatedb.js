#! /usr/bin/env node

console.log(
  'This script populates some pet items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/inventory-app?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require("./models/item");
const Category = require("./models/category");

const items = [];
const categories = [];

// Random value generator
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, type) {
  const category = new Category({ type: type });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${type}`);
}

async function itemCreate(
  index,
  item_name,
  description,
  category,
  price,
  stock_in_hand
) {
  const itemDetail = {
    item_name: item_name,
    description: description,
    category: category,
    price: price,
    stock_in_hand: stock_in_hand,
  };

  itemDetail.stock_availability = stock_in_hand > 0;

  const item = new Item(itemDetail);
  await item.save();
  items[index] = item;
  console.log(`Added item: ${item_name}`);
}

async function createCategories() {
  console.log("Adding pet items categories");
  await Promise.all([
    categoryCreate(0, "Dog Food"),
    categoryCreate(1, "Dog Toys"),
    categoryCreate(2, "Dog Treats"),
    categoryCreate(3, "Cat Food"),
    categoryCreate(4, "Cat Toys"),
    categoryCreate(5, "Cat Treats"),
  ]);
}

async function createItems() {
  console.log("Adding pet items");

  const dogFoodItems = [
    {
      name: "Premium Dog Food",
      description: "High-quality nutrition for your furry friend.",
    },
    {
      name: "Grain-Free Dog Food",
      description: "Specially formulated for dogs with sensitive stomachs.",
    },
    {
      name: "Puppy Chow",
      description: "Nutrient-rich food for growing puppies.",
    },
    {
      name: "Senior Dog Food",
      description: "Tailored nutrition for older dogs.",
    },
    {
      name: "Wet Dog Food Variety Pack",
      description: "Assorted flavors for a tasty meal every time.",
    },
    {
      name: "Organic Dog Food",
      description: "Made with natural ingredients for a healthier dog.",
    },
    {
      name: "Weight Management Dog Food",
      description: "Helps keep your dog at a healthy weight.",
    },
  ];

  const dogToysItems = [
    {
      name: "Rubber Chew Toy",
      description: "Durable toy for hours of chewing fun.",
    },
    {
      name: "Plush Squeaky Toy",
      description: "Soft toy that squeaks when squeezed, perfect for playtime.",
    },
    {
      name: "Tug-of-War Rope",
      description: "Interactive toy for bonding with your dog.",
    },
    {
      name: "Fetch Ball",
      description: "Classic ball for a game of fetch in the park.",
    },
    {
      name: "Puzzle Toy",
      description:
        "Keeps your dog mentally stimulated as they figure out how to get the treats.",
    },
    {
      name: "Interactive Dog Toy",
      description: "Keeps your dog entertained with lights and sounds.",
    },
    {
      name: "Dental Chew Toy",
      description:
        "Promotes dental health while satisfying your dog's chewing instincts.",
    },
  ];

  const dogTreatsItems = [
    {
      name: "Biscuit Treats",
      description: "Crunchy treats made with real chicken for a tasty reward.",
    },
    {
      name: "Jerky Treats",
      description:
        "High-protein treats made with real beef, perfect for training.",
    },
    {
      name: "Freeze-Dried Treats",
      description: "Preservative-free treats with a rich flavor dogs love.",
    },
    {
      name: "Dental Chews",
      description: "Helps keep teeth clean and breath fresh.",
    },
    {
      name: "Natural Rawhide Bones",
      description: "Long-lasting chew for hours of enjoyment.",
    },
    {
      name: "Soft Treats",
      description:
        "Soft and chewy treats that are easy to break into smaller pieces.",
    },
    {
      name: "Vegetable Dog Treats",
      description:
        "Healthy treats made with real vegetables for a nutritious snack.",
    },
  ];

  const catFoodItems = [
    {
      name: "Dry Cat Food",
      description: "Complete and balanced nutrition for adult cats.",
    },
    {
      name: "Kitten Food",
      description: "Formulated for the unique needs of growing kittens.",
    },
    {
      name: "Senior Cat Food",
      description: "Supports mobility and vitality in older cats.",
    },
    {
      name: "Grain-Free Cat Food",
      description: "Ideal for cats with food sensitivities or allergies.",
    },
    {
      name: "Wet Cat Food Variety Pack",
      description: "Assorted flavors to satisfy your cat's discerning palate.",
    },
    {
      name: "Indoor Cat Food",
      description: "Helps maintain a healthy weight and reduce hairballs.",
    },
    {
      name: "Hairball Control Cat Food",
      description: "Reduces hairballs and promotes healthy digestion.",
    },
  ];

  const catToysItems = [
    { name: "Feather Wand", description: "Entices cats to play and exercise." },
    {
      name: "Catnip Mice",
      description: "Filled with catnip for irresistible fun.",
    },
    {
      name: "Interactive Laser Toy",
      description:
        "Keeps your cat entertained with a laser beam they can chase.",
    },
    {
      name: "Scratching Post",
      description:
        "Satisfies your cat's natural urge to scratch while protecting your furniture.",
    },
    {
      name: "Cat Tunnel",
      description: "Provides hours of exploration and play.",
    },
    {
      name: "Ball Track Toy",
      description: "Stimulates your cat's senses with moving balls.",
    },
    {
      name: "Teaser Toy Set",
      description: "Includes a variety of toys to keep your cat engaged.",
    },
  ];

  const catTreatsItems = [
    {
      name: "Salmon Cat Treats",
      description: "Made with real salmon for a delicious flavor cats crave.",
    },
    {
      name: "Tuna Treats",
      description:
        "Rich in protein and omega-3 fatty acids for a healthy treat.",
    },
    {
      name: "Crunchy Cat Treats",
      description:
        "Helps support dental health by reducing plaque and tartar buildup.",
    },
    {
      name: "Freeze-Dried Chicken Treats",
      description: "Preservative-free treats with a crunchy texture cats love.",
    },
    {
      name: "Soft Cat Treats",
      description: "Soft and moist treats that are easy to chew and digest.",
    },
    {
      name: "Hairball Control Treats",
      description: "Contains natural fibers to help reduce hairballs.",
    },
    {
      name: "Dental Treats",
      description: "Helps clean teeth and freshen breath.",
    },
  ];

  console.log("Adding pet items");
  await Promise.all([
    console.log("Dog Food Items"),
    ...dogFoodItems.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        categories[0],
        getRandomNumber(5, 55).toFixed(2),
        getRandomNumber(0, 15).toFixed(0)
      )
    ),
    console.log("Dog Toys Items"),
    ...dogToysItems.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        categories[1],
        getRandomNumber(10, 60).toFixed(2),
        getRandomNumber(0, 15).toFixed(0)
      )
    ),
    console.log("Dog Treats Items"),
    ...dogTreatsItems.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        categories[2],
        getRandomNumber(7, 30).toFixed(2),
        getRandomNumber(0, 15).toFixed(0)
      )
    ),
    console.log("Cat Food Items"),
    ...catFoodItems.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        categories[3],
        getRandomNumber(9, 30).toFixed(2),
        getRandomNumber(0, 15).toFixed(0)
      )
    ),
    console.log("Cat Toys Items"),
    ...catToysItems.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        categories[4],
        getRandomNumber(12, 40).toFixed(2),
        getRandomNumber(0, 15).toFixed(0)
      )
    ),
    console.log("Cat Treats Items"),
    ...catTreatsItems.map((item, index) =>
      itemCreate(
        index,
        item.name,
        item.description,
        categories[5],
        getRandomNumber(3, 30).toFixed(2),
        getRandomNumber(0, 15).toFixed(0)
      )
    ),
  ]);
}
