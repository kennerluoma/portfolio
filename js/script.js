$(function () {
    let topOffset = $(window).scrollTop(), heroHeight = $(`.hero`).outerHeight(), didScroll = false;
    const smoothScroll = (target) => {
        const targetTop = $(target).offset().top;
        let speed = Math.abs($(window).scrollTop() - targetTop) / 2;
        speed = speed > 200 ? speed : 200;
        console.log(speed);
        $(`html, body`).animate({
            scrollTop: targetTop
        }, speed);
    };
    $(`a[href*="#"]:not([href="#"])`).on(`click`, function () {
        if (location.hostname == this.hostname) {
            smoothScroll($(this.hash));
        }
    });
    const $displayImage = $(`#display`).children(`.image`);
    $displayImage.addClass(`inactive`);
    $(`.card`).each(function () {
        const $this = $(this);
        const nth = $this.index() + 1;
        const $parent = $this.parent();
        const $column = $parent.siblings().children(`:nth-child(${nth})`);
        let toggleCard = () => {
            $this.toggleClass(`open`);
            $parent.toggleClass(`open`);
            $column.toggleClass(`expand-width`);
            $this.siblings().toggleClass(`shrink-width`);
            $parent.siblings().toggleClass(`shrink-height`);
            $column.siblings().toggleClass(`shrink-width`);
            $displayImage.toggleClass(`active`).toggleClass(`inactive`);
        };
        $this.click(function () {
            if (!$this.hasClass(`open`)) {
                let image = $this.css(`background-image`)
                    .replace(/url\(\"(.+)\"\)/gi, `$1`);
                $displayImage.css({ backgroundImage: `url("${image}")` });
                smoothScroll(`#portfolio`);
                toggleCard();
            }
            else if ($(event.target).is(`.close-btn, .close-btn span`)) {
                toggleCard();
            }
            $(document).on(`keydown`, function (event) {
                if ((event.keyCode === 27) && ($this.hasClass(`open`))) {
                    toggleCard();
                }
            });
        });
    });
});
