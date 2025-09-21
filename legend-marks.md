---
layout: page
title: Legend Marks
permalink: /legend-marks/
---

<h1>Legend Marks</h1>

Here is a fun collection of most types of legend marks in-game!

<!-- DataTables CSS -->
<link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">


<link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
<script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>


<table id="legendMarkTable" class="display" style="width:100%">
  <thead>
    <tr>
      <th>Aisling</th>
      <th style="display:none;">SearchText</th>
      <th>Mark</th>
    </tr>
  </thead>
  <tbody>
    {% for mark in site.data.legend-marks %}
    <tr>
      <td>{{ mark.aisling }}</td>
      <td style="display:none;">{{ mark.text | replace_first: '- ', '' }}</td>
      <td><img src="/assets/img/legend-marks/{{ mark.image }}" alt="{{ mark.text }}" style="height: 50px;" loading="lazy"></td>
    </tr>
    {% endfor %}
  </tbody>
</table>

<!-- jQuery + DataTables JS -->
<script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<script>
  $(document).ready(function () {
    $('#legendMarkTable').DataTable({
        pageLength: 50,
        scrollX: true,
        responsive: true,
        order: [[2, 'desc']],
    });
  });
</script>
