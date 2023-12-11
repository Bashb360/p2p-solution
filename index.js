const animals = [
  {
    name: "Boston",
    type: "dog",
    birthYear: 2023,
    url: "https://images.dog.ceo/breeds/spaniel-blenheim/n02086646_422.jpg",
  },
  {
    name: "New York",
    type: "cat",
    birthYear: 2010,
    url: "https://cataas.com/cat?type=square",
  },
  {
    name: "Austin",
    type: "dog",
    birthYear: 2015,
    url: "https://images.dog.ceo/breeds/corgi-cardigan/n02113186_6173.jpg",
  },
  {
    name: "Paris",
    type: "cat",
    birthYear: 2022,
    url: "https://cataas.com/cat?type=square",
  },
  {
    name: "Houston",
    type: "dog",
    birthYear: 2020,
    url: "https://images.dog.ceo/breeds/labradoodle/lola.jpg",
  },
  {
    name: "London",
    type: "cat",
    birthYear: 2021,
    url: "https://cataas.com/cat?type=square",
  },
];

// the code in here will only run when jQuery has loaded
$(() => {
  // this render function will help us draw our
  //  items on to the screen every time they change
  const render = (array) => {
    for (const item of array) {
      $(".animals").append(
        $("<div>")
          .addClass("image")
          .append(
            $("<img>")
              .attr("src", item.url)
              .attr("width", 240)
              .attr("height", 180)
              .text(item.city),
            $("<div>").append(
              $("<h1>").text(item.name),
              $("<h2>").text(
                item.type.slice(0, 1).toUpperCase() + item.type.slice(1)
              ),
              $("<h2>").text("Born in " + item.birthYear)
            )
          )
      );
    }
  };

  // first render the unfiltered, unsorted list
  // when we first land on the page
  render(animals);

  const filterAndRerender = (type) => {
    // clear current content
    $(".animals").html("");
    // filter
    const filteredArray = animals.filter((animal) => animal.type === type);
    // render new filtered content
    render(filteredArray);
  };

  let previousSort = null;

  const sortAndRerender = (property) => {
    // clear current content
    $(".animals").html("");
    // filter
    const sortedArray = animals.toSorted((a, b) => {
      const propA = a[property];
      const propB = b[property];
      if (typeof propA === "number") {
        if (previousSort === property) {
          return propB - propA;
        }

        return propA - propB;
      }
      if (typeof propA === "string") {
        if (previousSort === property) {
          return propB.localeCompare(propA);
        }

        return propA.localeCompare(propB);
      }
      throw new Error("unexpected property type :(");
    });
    if (previousSort === null) {
      previousSort = property;
    } else {
      previousSort = null;
    }
    // render new filtered content
    render(sortedArray);
  };

  // attach an event listener
  $("#filter-cats").on("click", () => {
    filterAndRerender("cat");
  });

  // attach an event listener
  $("#filter-dogs").on("click", () => {
    filterAndRerender("dog");
  });

  $("#sort-by-name").on("click", () => {
    sortAndRerender("name");
  });
  $("#sort-by-year").on("click", () => {
    sortAndRerender("birthYear");
  });

  $("#reset").on("click", () => {
    $(".animals").html("");
    render(animals);
  });
});
