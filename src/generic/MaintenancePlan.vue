<template>
  <div class="maintenance-plan-timeline">
    <h2>Workload Timeline (days)</h2>
    <div v-if="planRows.length === 0 || months.length === 0" style="margin: 24px 0; color: #bbb;">No maintenance plans scheduled.</div>
    <div v-else>
      <table class="timeline-table">
        <thead>
          <!-- First header row: years -->
          <tr>
            <th rowspan="2">Type</th>
            <th rowspan="2">Resource</th>
            <th rowspan="2">Maintenance Plan</th>
            <template v-for="(group, idx) in monthGroups" :key="'year-' + idx">
              <th class="month-col month-border" :colspan="group.months.length">{{ group.year }}</th>
            </template>
          </tr>
          <!-- Second header row: months -->
          <tr>
            <template v-for="(group, idx) in monthGroups" :key="'year-' + idx">
              <template v-for="(month, mIdx) in group.months" :key="month.label + mIdx">
                <th class="month-col month-border">{{ month.mon }}</th>
              </template>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in planRows" :key="row.resource + row.plan">
            <td>
              <GenericIcon class="icon" :name="row.resource"></GenericIcon>
            </td>
            <td class="resource-cell"><b>{{ row.name }}</b><br><i>{{ row.type }}</i></td>
            <td class="plan-cell">{{ row.plan }}</td>
            <template v-for="month in months" :key="month">
              <td class="month-col month-border">{{ row.effortByMonth[month] || '' }}</td>
            </template>
          </tr>
          <!-- Sum row -->
          <tr class="sum-row">
            <td></td>
            <td class="resource-cell" colspan="2" style="text-align:right; font-weight: bold;">Total Work (days)</td>
            <template v-for="month in months" :key="'sum-' + month">
              <td class="month-col month-border" style="font-weight:bold; background:#222b33;">{{ monthSums[month] || '' }}</td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="maintenance-events-list" style="margin-top:40px;">
      <h2>Maintenance Events</h2>
      <div v-if="eventRows.length === 0" style="margin: 18px 0; color: #bbb;">No events scheduled.</div>
      <div v-else>
        <table class="events-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Resource</th>
              <th>Maintenance Plan</th>
              <th>Effort (days)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in eventRows" :key="event.resource + event.plan + event.date">
              <td>
                <GenericIcon class="icon" :name="event.resource" />
              </td>
              <td>{{ event.date }}</td>
              <td><b>{{ event.name }}</b><br><i>{{ event.type }}</i></td>
              <td>{{ event.plan }}</td>
              <td>{{ event.effort }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import GenericIcon from './icons/GenericIcon.vue';

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export default {
  components: {
    GenericIcon
  },
  name: 'MaintenancePlan',
  props: {
    resourceInstances: {
      type: Array,
      required: true
    },
  },
  computed: {
    monthSums() {
      // Sum of all efforts for each month
      const sums = {};
      for (const month of this.months) {
        let total = 0;
        for (const row of this.planRows) {
          total += Number(row.effortByMonth[month] || 0);
        }
        sums[month] = total > 0 ? total : '';
      }
      return sums;
    },
    eventRows() {
      // List all individual maintenance events for all resources/plans (next 2 years)
      const events = [];
      const today = new Date();
      const endDate = new Date(today);
      endDate.setFullYear(endDate.getFullYear() + 2);
      for (const resource of this.resourceInstances) {
        if (!Array.isArray(resource.maintenance_plans)) continue;
        for (const plan of resource.maintenance_plans) {
          if (!plan.name || !plan.frequency_days) continue;
          let startDate = plan.last_executed_on_date ? new Date(plan.last_executed_on_date) : new Date(today);
          if (addDays(startDate, plan.frequency_days) < today) startDate = new Date(today);
          let nextDate = new Date(startDate);
          while (nextDate <= endDate) {
            if (nextDate >= today) {
              events.push({
                date: nextDate.toISOString().slice(0, 10),
                resource: resource.resource,
                name: resource.name,
                type: resource.type,
                plan: plan.name,
                effort: plan.work_effort_days || '',
              });
            }
            nextDate = addDays(nextDate, plan.frequency_days);
          }
        }
      }
      // Sort by date ascending
      events.sort((a, b) => a.date.localeCompare(b.date));
      return events;
    },
    months() {
      // Generate month labels for the next 24 months in 'YYYY MM' format
      const arr = [];
      const today = new Date();
      for (let i = 0; i < 24; i++) {
        const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const year = d.getFullYear();
        arr.push(`${year} ${d.toLocaleDateString('en-US', { month: 'short' })}`);
      }
      return arr;
    },
    monthGroups() {
      // Group months by year for the header
      const groups = [];
      let currentYear = null;
      let currentGroup = null;
      for (const month of this.months) {
        // month: e.g. '2025 01'
        const [year, mon] = month.split(' ');
        if (year !== currentYear) {
          if (currentGroup) groups.push(currentGroup);
          currentYear = year;
          currentGroup = { year, months: [] };
        }
        currentGroup.months.push({ label: month, mon });
      }
      if (currentGroup) groups.push(currentGroup);
      return groups;
    },
    planRows() {
      // For each resource/plan, calculate effort per month for the next 2 years
      const today = new Date();
      const endDate = new Date(today);
      endDate.setFullYear(endDate.getFullYear() + 2);
      const rows = [];
      for (const resource of this.resourceInstances) {
        if (!Array.isArray(resource.maintenance_plans)) continue;
        for (const plan of resource.maintenance_plans) {
          if (!plan.name || !plan.frequency_days) continue;
          // Start from last_executed_on_date or today
          let startDate = plan.last_executed_on_date ? new Date(plan.last_executed_on_date) : new Date(today);
          if (addDays(startDate, plan.frequency_days) < today) startDate = new Date(today);
          let nextDate = new Date(startDate);
          const effortByMonth = {};
          while (nextDate <= endDate) {
            const year = nextDate.getFullYear();
            const monthLabel = `${year} ${nextDate.toLocaleDateString('en-US', { month: 'short' })}`;
            effortByMonth[monthLabel] = (effortByMonth[monthLabel] || 0) + (plan.work_effort_days || 0);
            nextDate = addDays(nextDate, plan.frequency_days);
          }
          rows.push({
            resource: resource.resource,
            name: resource.name,
            type: resource.type,
            plan: plan.name,
            effortByMonth
          });
        }
      }
      return rows;
    }
  }
};
</script>

<style scoped>
h2 {
  font-size: 20px;
}
.maintenance-plan-timeline {
  padding: 32px 24px;
  color: #fff;
  text-align: left;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: auto;
  position: relative;
}
.timeline-table {
  border-collapse: collapse;
  margin-top: 18px;
  background: #23272e;
  border-radius: 8px;
  font-size: 1rem;
}
.timeline-table th, .timeline-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #333b44;
}

.timeline-table tbody tr:nth-child(even) td {
  background: #1a1d22;
}
.timeline-table tbody tr:nth-child(odd) td {
  background: #23272e;
}
.timeline-table th.month-border, .timeline-table td.month-border {
  width: 1px;
  background: #333b44;
  border: 1px solid #333b44;
}
.timeline-table th.month-col, .timeline-table td.month-col {
  background: inherit;
  text-align: center;
  vertical-align: middle;
}
.timeline-table td.resource-cell, .timeline-table td.plan-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.timeline-table th {
  background: #2a3550;
  color: #7ecfff;
  font-weight: bold;
}
.timeline-table tr:last-child td {
  border-bottom: none;
}
.toolbar-button {
  background: #2a3550;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.toolbar-button:hover {
  background: #3a4660;
}
.events-table {
  border-collapse: collapse;
  margin-top: 12px;
  background: #23272e;
  border-radius: 8px;
  font-size: 1rem;
}
.events-table th, .events-table td {
  padding: 7px 10px;
  border-bottom: 1px solid #333b44;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.events-table th {
  background: #2a3550;
  color: #7ecfff;
  font-weight: bold;
}
.events-table tr:last-child td {
  border-bottom: none;
}
.events-table tbody tr:nth-child(even) td {
  background: #1a1d22;
}
.events-table tbody tr:nth-child(odd) td {
  background: #23272e;
}
.icon {
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
</style>
