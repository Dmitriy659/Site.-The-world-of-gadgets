function Reviews(default_revs_elements) {
    if (default_revs_elements.length <= 3) {
        this.show_count = default_revs_elements.length;
    } else {
        this.show_count = 3;
    }
    this.default_revs_elements = default_revs_elements;
    this.total = default_revs_elements.length;
    this.elements_to_show = [];
    this.elements_to_show = default_revs_elements.slice(0, this.show_count);

    default_revs_elements.forEach(function (card) {
        default_revs.removeChild(card);
    });

    this.elements_to_show.forEach(function (card) {
        default_revs.appendChild(card);
    });

    this.load_more = function () {
        if (this.show_count + 2 >= this.total) {
            Array.prototype.push.apply(this.elements_to_show, default_revs_elements.slice(this.show_count, this.total));
            this.show_count = this.total;
            load_but.style.display = "none";
        } else {
            this.show_count += 2;
            Array.prototype.push.apply(this.elements_to_show, default_revs_elements.slice(this.show_count - 2, this.show_count));
        }
        this.update();
    }

    this.update = function () {
        let a = document.getElementById("revs");
        a.innerHTML = '';

        this.elements_to_show.forEach(function (card) {
            a.appendChild(card);
        });
    }

    this.sort_ocenka = function (opt) {
        this.default_revs_elements.sort(function (a, b) {
            var valueA = parseFloat(a.querySelector("#rev_value").textContent);
            var valueB = parseFloat(b.querySelector("#rev_value").textContent);
            if (opt == 2) {
                return valueB - valueA;
            } else {
                return valueA - valueB;
            }
        });

        this.elements_to_show = this.default_revs_elements.slice(0, this.show_count);
        this.update();
    }

    this.sort_date = function (selectedOption) {
        this.default_revs_elements.sort(function (a, b) {
            var dateA = new Date(a.querySelector("#rev_date").textContent);
            var dateB = new Date(b.querySelector("#rev_date").textContent);
            if (selectedOption == 5) {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        this.elements_to_show = this.default_revs_elements.slice(0, this.show_count);
        this.update();
    }
    this.sort_date = function() {
        this.default_revs_elements.sort(function(a, b) {
            var reg = /-|:|T|\+/;
            var parsedA = a.querySelector("#rev_date").textContent.split(reg);
            var parsedB = b.querySelector("#rev_date").textContent.split(reg);

            var dateA = new Date(parsedA[0], parsedA[1] - 1, parsedA[2], parsedA[3], parsedA[4], parsedA[5]);
            var dateB = new Date(parsedB[0], parsedB[1] - 1, parsedB[2], parsedB[3], parsedB[4], parsedB[5]);
            if (selectedOption == 5) {
                return dateA - dateB;
            }
            else {
                return dateB - dateA;
            }
        });

        this.elements_to_show = this.default_revs_elements.slice(0, this.show_count);
        this.update();
    }

    this.add = function (element) {
        this.total++;
        this.default_revs_elements.unshift(element);
        this.elements_to_show = this.default_revs_elements.slice(0, this.show_count);
        load_but.style.display = "block";
        this.update();
    }
}

function Captcha(element) {
    this.element = element;
    this.text = "";
    this.try = 1;

    this.gennerate_t = function () {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let randomText = '';

        for (let i = 0; i < 6; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            randomText += characters.charAt(randomIndex);
        }
        this.text = randomText;
        this.element.textContent = randomText;
    }

    this.check = function (q) {
        var t = document.getElementById("label_cap_text");
        if (q === this.text) {
            document.getElementById("captcha").style.display = "none";
            t.textContent = "Введите капчу:";
            t.style.color = "black";
            document.getElementById("input_captcha").value = "";
            return 1;
        } else {
            this.try++;
            if (this.try > 2) {
                document.getElementById("captcha").style.display = "none";
                t.textContent = "Введите капчу:";
                t.style.color = "black";
                document.getElementById("input_captcha").value = "";
                return 3;
            }
            t.textContent = "Неправильно";
            t.style.color = "red";
            return 2;
        }
    }

}

let default_revs = document.getElementById("revs");
let default_revs_elements = Array.from(default_revs.children);
let Review = new Reviews(default_revs_elements);

let load_but = document.getElementById("load_more_rev");

let sort_form = document.getElementById("rev_form");

let create_rev = document.getElementById("create_review");

load_but.addEventListener("click", function (event) {
    event.preventDefault();
    Review.load_more();
});

sort_form.addEventListener("submit", function (event) {
    event.preventDefault();
    var selectedOption = document.getElementById("sort_opt").value;
    if (selectedOption == 2 || selectedOption == 3) {
        Review.sort_ocenka(selectedOption);
    } else {
        Review.sort_date(selectedOption);
    }
});

create_rev.addEventListener("submit", function (event) {
    event.preventDefault();

    var cap = document.getElementById("captcha");
    var cap_text = document.getElementById("captcha_t");
    cap.style.display = "block";

    var close_cap = document.getElementById("close_captcha");
    var send_cap = document.getElementById("check_c");

    var captcha = new Captcha(cap_text);
    captcha.gennerate_t();

    close_cap.addEventListener("click", function (event) {
        event.preventDefault();
        cap.style.display = "none";
        var t = document.getElementById("label_cap_text");
        t.textContent = "Введите капчу:";
        t.style.color = "black";
        document.getElementById("input_captcha").value = "";
        captcha = null;
    });

    send_cap.addEventListener("submit", function (event) {
        event.preventDefault();

        var text_for_check = document.getElementById("input_captcha");
        var res = captcha.check(text_for_check.value);

        if (res === 1) {
            var name = document.getElementById("new_rev_name").value;
            var reviewText = document.getElementById("new_rev_text").value;
            var rating = document.getElementById("new_rev_rating").value;
            // Создаем новый элемент отзыва
            var newReviewElement = document.createElement("div");
            newReviewElement.className = "rev";
            newReviewElement.innerHTML = `
                <div class="rev_name">
                    <strong id="user_name">${name}</strong>
                    <strong id="rev_value">${rating}</strong>
                    <img src="img/Reviews/star.png" alt="stars">
                </div>
                <p id="rev_date">${getCurrentDate()}</p>
                <p class="rev_text">${reviewText}</p>
            `;
            Review.add(newReviewElement);
            captcha = null;
        } else if (res === 3) {
            captcha = null;
        }

    });
});
