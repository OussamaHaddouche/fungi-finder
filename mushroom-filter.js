const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noResultsMessage = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  edible: "all",
};

function enableFiltering() {
  seasonalFilter.removeAttribute("hidden");
  edibleFilter.removeAttribute("hidden");
}

function updateFilter(e) {
  const filterType = e.target.name;
  currentFilters[filterType] = e.target.value;
  if (!document.startViewTransition) {
    filterCards();
    return;
  }
  document.startViewTransition(() => filterCards());
}

function filterCards() {
  let hasVisibleCards = false;
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;
    const matchesSeason = currentFilters.season === season;
    const matchesType = currentFilters.edible === edible;

    if (
      (currentFilters.season === "all" || matchesSeason) &&
      (currentFilters.edible === "all" || matchesType)
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }
  });
  if (hasVisibleCards) {
    noResultsMessage.hidden = true;
  } else {
    noResultsMessage.hidden = false;
  }
}

enableFiltering();
seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);
