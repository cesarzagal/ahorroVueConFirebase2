<template>
  <v-card>
    <v-card-text>
      <div class="chartAFP" ref="chartAFP">
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4lang_es_ES from '@amcharts/amcharts4/lang/es_ES';

am4core.useTheme(am4themes_animated);
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "Home",

  data(){
    return {
      chart: {},
    }
  },
  async mounted(){
    await this.listar()
    this.obtieneDatosFondo()
  },
  computed:{
    ...mapGetters({lista: 'lista', estado:'estado'})
  },
  watch:{
    lista(){
      if(this.estado) {
        this.chart.data = this.lista;
      }
    },
  },
  methods:{
    ...mapActions({listar: 'fetchList'}),
    obtieneDatosFondo(){
      this.chart = am4core.create(this.$refs.chartAFP, am4charts.XYChart);
      this.chart.language.locale = am4lang_es_ES;

      this.chart.data = this.lista;
      this.chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
      this.chart.responsive.enabled = true;
      let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;

      let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.title.text = "Monto $";
      valueAxis.min = 33000000;

      let series = this.chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = "value";
      series.dataFields.dateX = "date";
      series.tooltipText = "$ [bold]{valueY}[/]";
      series.fillOpacity = 1;
      series.showOnInit = false;

      this.chart.cursor = new am4charts.XYCursor();
      this.chart.cursor.lineY.opacity = 0;
      this.chart.scrollbarX = new am4charts.XYChartScrollbar();
      this.chart.scrollbarX.series.push(series);
      //this.chart = chart;
    }
  }
}
</script>
<style scoped>
.chartAFP {
  width: 100%;
  height: 587px;
}
</style>