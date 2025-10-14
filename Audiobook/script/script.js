const title = document.getElementById("title-book");
const author = document.getElementById("author-book");

const buttonPlay = document.getElementById("play");
const buttonPause = document.getElementById("pause");

const buttonNextChapter = document.getElementById("forward");
const buttonPreviousChapter = document.getElementById("backward");

const buttonNextBook = document.getElementById("arrow-next");
const buttonPreviousBook = document.getElementById("arrow-back");

const audio = document.getElementById("audio-book");
const image = document.getElementById("image-book");

const resetedBooks = [
  {
    title: "Dom Casmurro - Capítulo ",
    author: "Machado de Assis",
    url_audio: "https://dn721904.ca.archive.org/0/items/dom_casmurro_2102_librivox/domcasmurro_{capitulo}_assis_64kb.mp3",
    url_image: "https://dn721904.ca.archive.org/0/items/dom_casmurro_2102_librivox/domcasmurro_2102.jpg",
    totalChapters: 30,
    currentChapter: 1
  },
  {
    title: "Memórias Póstumas de Brás Cubas - Capítulo ",
    author: "Machado de Assis",
    url_audio: "https://ia902802.us.archive.org/11/items/memoriaspostumas_debrascubas_1912_librivox/memoriaspostumas_{capitulo}_assis_64kb.mp3",
    url_image: "https://ia601206.us.archive.org/12/items/librivoxcdcoverart34/memorias_postumas_1912.jpg",
    totalChapters: 32,
    currentChapter: 1
  },
  {
    title: "Senhora - Capítulo ",
    author: "José de Alencar",
    url_audio: "https://ia801306.us.archive.org/12/items/senhora_0910_librivox/senhora_{capitulo}_alencar_64kb.mp3",
    url_image: "https://ia600204.us.archive.org/32/items/LibrivoxCdCoverArt20/Senhora_1206.jpg",
    totalChapters: 41,
    currentChapter: 1
  },
  {
    title: "O Cortiço - Capítulo ",
    author: "Aluísio Azevedo",
    url_audio: "https://ia802803.us.archive.org/18/items/cortio_1808_librivox/cortio_{capitulo}_azevedo_64kb.mp3",
    url_image: "https://ia601206.us.archive.org/12/items/librivoxcdcoverart34/cortico_1808.jpg",
    totalChapters: 23,
    currentChapter: 1
  },
  {
    title: "O Guarany - Capítulo ",
    author: "José de Alencar",
    url_audio: "https://dn721400.ca.archive.org/0/items/oguarany_2505_librivox/guarany_{capitulo}_alencar_64kb.mp3",
    url_image: "https://dn721400.ca.archive.org/0/items/oguarany_2505_librivox/o_guarani_2505.jpg",
    totalChapters: 58,
    currentChapter: 1
  },
  {
    title: "O Mulato - Capítulo ",
    author: "Aluísio Azevedo",
    url_audio: "https://ia803104.us.archive.org/12/items/o_mulato_1804_librivox/mulato_{capitulo}_azevedo_64kb.mp3",
    url_image: "https://ia803104.us.archive.org/12/items/o_mulato_1804_librivox/omulato_1804.jpg",
    totalChapters: 17,
    currentChapter: 1
  },
  {
    title: "Histórias Sem Data - Capítulo ",
    author: "Machado de Assis",
    url_audio: "https://dn720309.ca.archive.org/0/items/historias_sem_data_2108_librivox/historiassemdata_{capitulo}_assis_64kb.mp3",
    url_image: "https://dn720309.ca.archive.org/0/items/historias_sem_data_2108_librivox/historias_sem_data_jm_machado_assis_2108.jpg",
    totalChapters: 18,
    currentChapter: 1
  },
  {
    title: "Triste Fim de Policarpo Quaresma - Capítulo ",
    author: "Lima Barreto",
    url_audio: "https://ia601307.us.archive.org/34/items/triste_fim_policarpo_quaresma_fm_librivox/tristefimdepolicarpoquaresma_{capitulo}_barreto_64kb.mp3",
    url_image: "https://ia800205.us.archive.org/30/items/LibrivoxCdCoverArt23/Triste_Fim_Policarpo_Quaresma_1210.jpg",
    totalChapters: 15,
    currentChapter: 1
  },
  {
    title: "Helena - Capítulo ",
    author: "Machado de Assis",
    url_audio: "https://ia601605.us.archive.org/14/items/helena_1501_librivox/helena_{capitulo}_assis_64kb.mp3",
    url_image: "https://ia800208.us.archive.org/11/items/LibrivoxCdCoverArt17/helena_1501.jpg",
    totalChapters: 28,
    currentChapter: 1
  },
  {
    title: "O Abolicionismo - Capítulo ",
    author: "Joaquim Nabuco",
    url_audio: "https://dn720308.ca.archive.org/0/items/o_abolicionismo_2009_librivox/oabolicionismo_{capitulo}_nabuco_64kb.mp3",
    url_image: "https://dn720308.ca.archive.org/0/items/o_abolicionismo_2009_librivox/abolicionismo_2009.jpg",
    totalChapters: 18,
    currentChapter: 1
  }
];

let actualBooks;

let isPlaying = false;
let bookIndex;
let currentBook;

window.addEventListener("DOMContentLoaded", () => {
    const savedBackground = localStorage.getItem("userBackgroundPreference");

    if (savedBackground) {
        const button = document.getElementById(savedBackground);
        if (button) {
            changeBackground(button);
        }
    }

    const savedBooks = localStorage.getItem("userBooksConfiguration");
    const lastBook = localStorage.getItem("userCurrentBook");

    if (savedBooks || lastBook) {
        actualBooks = JSON.parse(savedBooks);
        bookIndex = JSON.parse(lastBook);
    } else {
        actualBooks = resetedBooks;
        bookIndex = 0;
    }

    currentBook = actualBooks[bookIndex];
    loadBook();
});

function playBook() {
    audio.play();
    buttonPlay.style.display = "none";
    buttonPause.style.display = "block";
    isPlaying = true;
}

function pauseBook() {
    audio.pause();
    buttonPlay.style.display = "block";
    buttonPause.style.display = "none";
    isPlaying = false;
}

function playPauseBook() {
    if (isPlaying) {
        pauseBook();
    } else {
        playBook();
    }
}

function changeBackground(cor) {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    const lightColor = computedStyle.getPropertyValue("--light-" + cor.id);
    const darkColor = computedStyle.getPropertyValue("--dark-" + cor.id);

    if (lightColor && darkColor) {
        root.style.setProperty("--light-standard-color", lightColor);
        root.style.setProperty("--dark-standard-color", darkColor);
        localStorage.setItem("userBackgroundPreference", cor.id);
    }
}

function loadBook() {
    title.innerText = currentBook.title + currentBook.currentChapter.toString();
    author.innerText = currentBook.author;

    image.src = currentBook.url_image;
    image.alt = currentBook.author + currentBook.title + currentBook.currentChapter.toString();
    audio.src = currentBook.url_audio.replace('{capitulo}', String(currentBook.currentChapter).padStart(2, '0'));

    actualBooks[bookIndex] = currentBook;
    localStorage.setItem("userBooksConfiguration", JSON.stringify(actualBooks));
    localStorage.setItem("userCurrentBook", JSON.stringify(bookIndex));
}

function nextChapter() {
    pauseBook();
    if (currentBook.currentChapter < currentBook.totalChapters){
        currentBook.currentChapter++;
    } else {
        currentBook.currentChapter = 1;
    }

    loadBook();
}

function previousChapter() {
    pauseBook();
    if (currentBook.currentChapter > 1){
        currentBook.currentChapter--;
    } else {
        currentBook.currentChapter = currentBook.totalChapters;
    }

    loadBook();
}

function nextBook() {
    pauseBook();
    if (bookIndex < 9) {
        bookIndex++;
    } else {
        bookIndex = 0;
    }

    currentBook = actualBooks[bookIndex];
    loadBook();
}

function previousBook() {
    pauseBook();
    if (bookIndex > 0) {
        bookIndex--;
    } else {
        bookIndex = 9;
    }

    currentBook = actualBooks[bookIndex];
    loadBook();
}

buttonPlay.addEventListener("click", playPauseBook);
buttonPause.addEventListener("click", playPauseBook);

buttonNextChapter.addEventListener("click", nextChapter);
buttonPreviousChapter.addEventListener("click", previousChapter);

buttonNextBook.addEventListener("click", nextBook);
buttonPreviousBook.addEventListener("click", previousBook);

audio.addEventListener("ended", nextChapter);
