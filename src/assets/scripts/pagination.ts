const listArray = [] as any;
const urlParams = new URLSearchParams(window.location.search) as any;

const data = Array.from({ length: 2 }).map((el, i) => {
  if (!el) {
    el = {
      name: `Main Content ${i + 1}`,
      id: i,
      fav: false,
      card: false,
      rated: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
    };
  }
  return el as any;
});

let perPage = 16;
const state = {
  page: 1,
  perPage,
  totalPages: Math.ceil(data.length / perPage),
};

const controls = {
  next() {
    state.page++;

    if (state.page > state.totalPages) {
      this.prev();
    }

    urlParams.set("page", `${state.page}`);
  },
  prev() {
    state.page--;

    if (state.page < 1) {
      this.next();
    }
    urlParams.set("page", `${state.page}`);
  },
  goTo(page: number) {
    state.page = page;

    list.update();

    if (state.page > state.totalPages) {
      this.goTo(state.totalPages);
    }

    if (state.page < 1) {
      this.goTo(1);
    }
    urlParams.set("page", `${state.page}`);
  },
};

const list = {
  update() {
    listArray.value = [];

    let page = state.page - 1;
    let start = page * state.perPage;
    let end = start + state.perPage;

    const paginatedItems = data.slice(start, end);

    listArray.value = paginatedItems;
    urlParams.set("page", state.page);
  },
};

function changePage(n: any) {
  urlParams.set("page", `${n}`);
  window.location.search = urlParams;
}

export { data, state, controls, list, listArray, changePage };
