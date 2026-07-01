document.addEventListener("DOMContentLoaded", () => {
  if (window.alFolio?.compatBootstrap) {
    return;
  }

  const asBool = (value) => String(value || "").toLowerCase() === "true";

  const parseSortValue = (value) => {
    if (typeof value === "number") {
      return { type: "number", value };
    }

    const text = String(value ?? "").trim();
    const numeric = Number(text.replace(/[$,%\s,]/g, ""));
    if (text !== "" && Number.isFinite(numeric) && /^[-+]?[$]?\d/.test(text)) {
      return { type: "number", value: numeric };
    }

    return { type: "string", value: text.toLowerCase() };
  };

  class AfTableEngine {
    constructor(table) {
      this.table = table;
      this.columns = Array.from(table.querySelectorAll("thead th")).map((th, index) => ({
        element: th,
        index,
        field: th.dataset.field || `__col_${index}`,
        checkbox: asBool(th.dataset.checkbox),
        sortable: asBool(th.dataset.sortable),
        align: th.dataset.align || "",
        halign: th.dataset.halign || th.dataset.align || "",
      }));
      this.state = {
        allRows: [],
        filteredRows: [],
        search: "",
        page: 1,
        pageSize: Number.parseInt(table.dataset.pageSize || "10", 10) || 10,
        sortField: null,
        sortDirection: "asc",
      };
      this.options = {
        search: asBool(table.dataset.search),
        pagination: asBool(table.dataset.pagination),
        clickToSelect: asBool(table.dataset.clickToSelect),
        dataUrl: table.dataset.url || "",
      };
      this.tbody = table.querySelector("tbody") || table.createTBody();
    }

    async init() {
      this.table.classList.add("table", "table-hover", "af-table-enhanced");
      this.buildShell();
      this.bindHeaderSort();
      this.state.allRows = await this.loadRows();
      this.applyFiltersAndSort();
      this.render();
    }

    buildShell() {
      const shell = document.createElement("div");
      shell.className = "af-table-shell";

      this.table.parentNode.insertBefore(shell, this.table);
      shell.appendChild(this.table);

      const toolbar = document.createElement("div");
      toolbar.className = "af-table-toolbar";
      shell.insertBefore(toolbar, this.table);
      this.toolbar = toolbar;

      if (this.options.search) {
        const searchInput = document.createElement("input");
        searchInput.className = "af-table-search";
        searchInput.type = "search";
        searchInput.placeholder = "Search table...";
        searchInput.setAttribute("aria-label", "Search table rows");
        searchInput.addEventListener("input", () => {
          this.state.search = searchInput.value.trim().toLowerCase();
          this.state.page = 1;
          this.applyFiltersAndSort();
          this.render();
        });
        toolbar.appendChild(searchInput);
      }

      if (this.options.pagination) {
        const pagination = document.createElement("div");
        pagination.className = "af-table-pagination";

        const info = document.createElement("span");
        info.className = "af-table-page-info";
        pagination.appendChild(info);
        this.pageInfo = info;

        const prevButton = document.createElement("button");
        prevButton.type = "button";
        prevButton.textContent = "Prev";
        prevButton.addEventListener("click", () => {
          if (this.state.page > 1) {
            this.state.page -= 1;
            this.render();
          }
        });
        pagination.appendChild(prevButton);
        this.prevButton = prevButton;

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", () => {
          if (this.state.page < this.totalPages()) {
            this.state.page += 1;
            this.render();
          }
        });
        pagination.appendChild(nextButton);
        this.nextButton = nextButton;

        this.toolbar.appendChild(pagination);
      }
    }

    bindHeaderSort() {
      this.columns.forEach((column) => {
        if (!column.sortable || column.checkbox) {
          return;
        }

        if (column.halign) {
          column.element.style.textAlign = column.halign;
        }
        column.element.classList.add("af-sortable");
        column.element.addEventListener("click", () => {
          if (this.state.sortField === column.field) {
            this.state.sortDirection = this.state.sortDirection === "asc" ? "desc" : "asc";
          } else {
            this.state.sortField = column.field;
            this.state.sortDirection = "asc";
          }
          this.renderHeaders();
          this.applyFiltersAndSort();
          this.render();
        });
      });
    }

    async loadRows() {
      if (!this.options.dataUrl) {
        return this.readRowsFromMarkup();
      }

      try {
        const response = await fetch(this.options.dataUrl, { credentials: "same-origin" });
        if (!response.ok) {
          return this.readRowsFromMarkup();
        }
        const payload = await response.json();
        if (!Array.isArray(payload)) {
          return this.readRowsFromMarkup();
        }
        return payload.map((row) => this.normalizeRow(row));
      } catch (_error) {
        return this.readRowsFromMarkup();
      }
    }

    readRowsFromMarkup() {
      const rows = Array.from(this.tbody.querySelectorAll("tr"));
      return rows.map((tr) => {
        const cells = Array.from(tr.querySelectorAll("td"));
        const row = {};
        this.columns.forEach((column) => {
          const cell = cells[column.index];
          if (column.checkbox) {
            row[column.field] = Boolean(cell?.querySelector('input[type="checkbox"]')?.checked);
          } else {
            row[column.field] = cell ? cell.textContent.trim() : "";
          }
        });
        return row;
      });
    }

    normalizeRow(row) {
      const normalized = {};
      this.columns.forEach((column) => {
        if (column.checkbox) {
          normalized[column.field] = Boolean(row[column.field]);
          return;
        }
        normalized[column.field] = row[column.field] ?? "";
      });
      return normalized;
    }

    applyFiltersAndSort() {
      let rows = this.state.allRows.slice();
      if (this.state.search) {
        rows = rows.filter((row) => {
          return this.columns.some((column) => {
            if (column.checkbox) {
              return false;
            }
            const value = row[column.field];
            return String(value ?? "")
              .toLowerCase()
              .includes(this.state.search);
          });
        });
      }

      if (this.state.sortField) {
        const direction = this.state.sortDirection === "asc" ? 1 : -1;
        const field = this.state.sortField;
        rows.sort((leftRow, rightRow) => {
          const left = parseSortValue(leftRow[field]);
          const right = parseSortValue(rightRow[field]);
          if (left.type === "number" && right.type === "number") {
            return (left.value - right.value) * direction;
          }
          return String(left.value).localeCompare(String(right.value)) * direction;
        });
      }

      this.state.filteredRows = rows;
      if (this.state.page > this.totalPages()) {
        this.state.page = this.totalPages();
      }
    }

    totalPages() {
      if (!this.options.pagination) {
        return 1;
      }
      return Math.max(1, Math.ceil(this.state.filteredRows.length / this.state.pageSize));
    }

    paginatedRows() {
      if (!this.options.pagination) {
        return this.state.filteredRows;
      }
      const from = (this.state.page - 1) * this.state.pageSize;
      return this.state.filteredRows.slice(from, from + this.state.pageSize);
    }

    renderHeaders() {
      this.columns.forEach((column) => {
        const label = column.element.dataset.afLabel || column.element.textContent.trim();
        column.element.dataset.afLabel = label;
        if (!column.sortable || column.checkbox) {
          return;
        }

        if (this.state.sortField === column.field) {
          const directionMarker = this.state.sortDirection === "asc" ? " \u2191" : " \u2193";
          column.element.textContent = `${label}${directionMarker}`;
        } else {
          column.element.textContent = label;
        }
      });
    }

    render() {
      this.renderHeaders();
      this.tbody.replaceChildren();

      this.paginatedRows().forEach((row) => {
        const tr = document.createElement("tr");
        let checkboxControl = null;

        this.columns.forEach((column) => {
          const td = document.createElement("td");
          if (column.align) {
            td.style.textAlign = column.align;
          }

          if (column.checkbox) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = Boolean(row[column.field]);
            checkbox.setAttribute("aria-label", "Select row");
            checkbox.addEventListener("change", () => {
              row[column.field] = checkbox.checked;
              tr.classList.toggle("af-row-selected", checkbox.checked);
            });
            checkboxControl = checkbox;
            td.appendChild(checkbox);
            tr.classList.toggle("af-row-selected", checkbox.checked);
          } else {
            td.textContent = String(row[column.field] ?? "");
          }

          tr.appendChild(td);
        });

        if (this.options.clickToSelect && checkboxControl) {
          tr.addEventListener("click", (event) => {
            if (event.target.closest('a, button, input, label, select, textarea')) {
              return;
            }
            checkboxControl.checked = !checkboxControl.checked;
            checkboxControl.dispatchEvent(new Event("change", { bubbles: true }));
          });
        }

        this.tbody.appendChild(tr);
      });

      if (this.options.pagination && this.pageInfo && this.prevButton && this.nextButton) {
        const totalPages = this.totalPages();
        this.pageInfo.textContent = `Page ${this.state.page} / ${totalPages}`;
        this.prevButton.disabled = this.state.page <= 1;
        this.nextButton.disabled = this.state.page >= totalPages;
      }
    }
  }

  document.querySelectorAll('table[data-toggle="table"]').forEach((table) => {
    if (table.dataset.afTableInitialized === "true") {
      return;
    }
    table.dataset.afTableInitialized = "true";
    const engine = new AfTableEngine(table);
    engine.init();
  });
});
