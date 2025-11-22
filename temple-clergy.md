---
layout: page
title: Temple Clergy
permalink: /temple-clergy/
---

<h1>Temple Clergy</h1>

Here are various Temple Clergy that I've seen. Mostly based on Aislings I've seen in 2025

<a href="/assets/json/clergy-2025.json">Raw File</a>

<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/plug-ins/1.13.6/features/searchHighlight/dataTables.searchHighlight.css">
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">


<table id="templeClergyTable" class="display" style="width:100%">
  <thead>
    <tr>
      <th>Temple</th>
      <th>High Priest</th>
      <th>Minister</th>
      <th>Cleric</th>
      <th>Priest</th>
    </tr>
  </thead>
  <tbody>
    {% for temple in site.data.clergy-2025 %}
    <tr>
      <td>{{ temple[0] }}</td>
      <td>{% if temple[1]["High Priest"] %}{{ temple[1]["High Priest"] | join: ", " }}{% endif %}</td>
      <td>{% if temple[1].Minister %}{{ temple[1].Minister | join: ", " }}{% endif %}</td>
      <td>{% if temple[1].Cleric %}{{ temple[1].Cleric | join: ", " }}{% endif %}</td>
      <td>{% if temple[1].Priest %}{{ temple[1].Priest | join: ", " }}{% endif %}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<!-- jQuery + DataTables JS -->
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
<script src="https://bartaz.github.io/sandbox.js/jquery.highlight.js"></script>
<script src="https://cdn.datatables.net/plug-ins/1.13.6/features/searchHighlight/dataTables.searchHighlight.min.js"></script>

<script>
  $(document).ready(function () {
    $('#templeClergyTable').DataTable({
        pageLength: 50,
        scrollX: true,
        responsive: true,
        order: [[0, 'asc']],
        searchHighlight: true
    });
  });
</script>
