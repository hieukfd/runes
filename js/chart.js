const weeklyChart = document.getElementById("weeklyChart");

const dataWeek = {
  labels: vm
    .scoreByWeek()
    .map(
      (item) =>
        moment(item.week, "YYYY-[W]WW").startOf("isoWeek").format("DD/MM") +
        "-" +
        moment(item.week, "YYYY-[W]WW").endOf("isoWeek").format("DD/MM/YYYY"),
    ),
  datasets: [
    {
      label: "Total",
      data: vm.scoreByWeek().map((item) => item.total),
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

const dataDay = {
  labels: vm.score().map((item) => item.index),
  datasets: [
    {
      label: "Total",
      data: vm.score().map((item) => item.value),
      borderColor: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      fill: true,
      tension: 0.3,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
  ],
};

new Chart(weeklyChart, {
  type: "line",
  data: dataWeek,
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return (
              context.dataset.label + ": " + context.raw.toLocaleString("vi-VN")
            );
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return (value / 1e9).toFixed(0) + "T";
          },
        },
      },
    },
  },
});