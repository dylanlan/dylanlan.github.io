---
layout: page
title: Guild Members
permalink: /guild-members/
---

<h1>Guild Members</h1>

Here are some guild leaders, council, and members that I've seen. Mostly based on Aislings I've seen in 2025.

<a href="/assets/json/guilds-2025.json">Raw File</a>

<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<link rel="stylesheet" href="https://cdn.datatables.net/plug-ins/1.13.6/features/searchHighlight/dataTables.searchHighlight.css">
<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">


<table id="guildMemberTable" class="display" style="width:100%">
  <thead>
    <tr>
      <th>Guild</th>
      <th>Leader</th>
      <th>Council</th>
      <th>Members</th>
    </tr>
  </thead>
  <tbody>
    {% for guild in site.data.guilds-2025 %}
    <tr>
      <td>{{ guild[0] }}</td>
      <td>{% if guild[1].Leader %}{{ guild[1].Leader | join: ", " }}{% endif %}</td>
      <td>{% if guild[1].Council %}{{ guild[1].Council | join: ", " }}{% endif %}</td>
      <td>{% if guild[1].Member %}{{ guild[1].Member | join: ", " }}{% endif %}</td>
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
    $('#guildMemberTable').DataTable({
        pageLength: 100,
        scrollX: true,
        responsive: true,
        order: [[0, 'asc']],
        searchHighlight: true
    });
  });
</script>
