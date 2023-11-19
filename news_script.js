function News(default_elements) {
    this.default_elements = default_elements.slice();
    this.visible_elements = this.default_elements.slice();

    this.last_search = "";
    this.last_filt = [];

    this.filt_tags = function(values) {
        this.last_filt = values.slice();
        this.applyFilters();
    };

    this.search_new = function(value) {
        this.last_search = value;
        this.applyFilters();
    };

    this.applyFilters = function() {
        this.visible_elements = this.default_elements.filter(function(element) {
            var name = element.querySelector(".new_name").textContent.toLowerCase();
            var newsTags = Array.from(element.querySelectorAll('.tag_t')).map(function(tagElement) {
                return tagElement.textContent;
            });

            var filterCondition = this.last_filt.length === 0 || this.last_filt.every(function(value) {
                return newsTags.includes(value);
            });

            var searchCondition = this.last_search.trim() === "" || name.includes(this.last_search.toLowerCase());

            return filterCondition && searchCondition;
        }, this);

        this.updateDisplay();
    };

    this.updateDisplay = function() {
        this.default_elements.forEach(function(element) {
            if (this.visible_elements.includes(element)) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        }, this);
    };
}


let newsContainer = document.querySelector('.news');
let default_elements = Array.from(newsContainer.children);
let news = new News(default_elements);

let filter_tags = document.getElementById("filter_news");
let seacrh_but = document.querySelector('.seacrh_form');

filter_tags.addEventListener("submit", function(event) {
    event.preventDefault();
    var filterForm = document.getElementById('filter_news');
    var selectedCheckboxes = filterForm.querySelectorAll('input[type="checkbox"]:checked');
    var selectedValues = [];

    selectedCheckboxes.forEach(function(checkbox) {
        selectedValues.push(checkbox.value);
    });
    news.filt_tags(selectedValues);
})

seacrh_but.addEventListener("submit", function(event) {
    event.preventDefault();
    var temp = document.getElementById("seacrh_input");
    news.search_new(temp.value);
})