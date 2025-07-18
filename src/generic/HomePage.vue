<template>
  <div class="app-container mx-0 px-0">
    <div class="toolbar">
      <button class="generate-plan-btn" @click="showMaintenancePlan = !showMaintenancePlan">
        {{ showMaintenancePlan ? 'Hide' : 'Show'}} Maintenance Report
      </button>
      <div class="toggle-switch" v-if="!showMaintenancePlan">
        <button
          :class="['toggle-side toggle-side-left', !jsonMode ? 'active' : '']"
          @click="setMode(false)"
        >
          GUI
        </button>
        <button
          :class="['toggle-side toggle-side-right', jsonMode ? 'active' : '']"
          @click="setMode(true)"
        >
          JSON
        </button>
      </div>
      <div v-if="!jsonMode && !selectedResource && !showMaintenancePlan && !selectedArrow">
        <h3 style="font-size: 20px; margin-top: 10px">Add Resources</h3>
        <div class="resource-list-row">
          <div
            class="resource-component"
            draggable="true"
            v-for="type in resourceTypes"
            :key="type"
            @dragstart="(event) => onDragStart(event, type)"
          >
            <GenericIcon class="resource-icon" 
                :name=type
                @mouseenter="showResourceTooltip(type)"
                @mouseleave="hideResourceTooltip"
                />
            <div
              v-if="tooltipResource === type"
              class="resource-tooltip"
              style="white-space: pre-wrap;"
            >
              {{ type.replace(' ', '\n') }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedArrow && !showMaintenancePlan && !jsonMode" class="selected-resource-label">
        <h3 style="font-size: 20px">Arrow</h3>
        <button class="toolbar-button delete-btn" @click="deleteSelectedArrow">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </button>
      </div>
      <div v-if="selectedResource && !showMaintenancePlan && !jsonMode" class="selected-resource-label">
        <h3 style="font-size: 20px">{{ selectedResource.name }}</h3>
          <button class="toolbar-button" @click="startAddArrow" :disabled="addingArrow" style="margin-top:8px;">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M15 16l4 -4" /><path d="M15 8l4 4" /></svg>
        </button>
        <div v-if="addingArrow" style="color:#fff; font-size:0.95rem; margin-top:4px;">Select a target resource...</div>
        <br>
        <button class="toolbar-button delete-btn" @click="deleteSelectedResource">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
        </button>

        <!-- Maintenance Plans Section -->
        <div class="maintenance-plans-toolbar">
          <h3 style="font-size:20px;">Maintenance Plans</h3>
          <div v-if="selectedResource.maintenance_plans && selectedResource.maintenance_plans.length">
            <div v-for="(plan, idx) in selectedResource.maintenance_plans" :key="idx">
              <div class="maintenance-plan-item-vertical">
                <label class="plan-label">Plan name
                  <input v-model="plan.name" class="plan-input" placeholder="Plan name" />
                </label>
                <label class="plan-label">Frequency (days)
                  <input v-model.number="plan.frequency_days" class="plan-input" type="number" min="1" placeholder="Frequency (days)" />
                </label>
                <label class="plan-label">Effort (days)
                  <input v-model.number="plan.work_effort_days" class="plan-input" type="number" min="0" placeholder="Effort (days)" />
                </label>
                <label class="plan-label">Last executed (optional)
                  <input v-model="plan.last_executed_on_date" class="plan-input" type="date" />
                </label>
                <button class="plan-delete-btn" @click="removeMaintenancePlan(idx)">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </button>
              </div>
              <hr v-if="idx < selectedResource.maintenance_plans.length - 1" style="border: none; border-top: 1px solid #fff; margin: 8px 0;" />
            </div>
          </div>
          <button class="plan-add-btn" @click="addMaintenancePlan">+ Add Plan</button>
        </div>
      </div>
    </div>
    <MaintenancePlan v-if="showMaintenancePlan" :resource-instances="resourceInstances" />
    <div v-if="!jsonMode && !showMaintenancePlan"
      class="canvas"
      @dragover.prevent
      @drop="onDrop"
      @mousedown.self="deselectResource"
    >
      <!-- SVG arrows below resources -->
      <svg :width="canvasWidth" :height="canvasHeight" style="position:absolute;top:0;left:0;z-index:0;pointer-events:none;">
        <g>
          <template v-for="resource in resourceInstances">
            <template v-for="targetName in resource.arrow_to_resource_names">
              <ArrowLine
                v-if="getResourceByName(targetName)"
                :key="resource.name + '->' + targetName"
                :from="getArrowFrom(resource)"
                :to="getArrowTo(getResourceByName(targetName))"
                :class="{ 'selected-arrow': selectedArrow && selectedArrow.from === resource.name && selectedArrow.to === targetName }"
                @click.stop="selectArrow(resource.name, targetName)"
                style="cursor:pointer; pointer-events:all;"
              />
            </template>
          </template>
        </g>
      </svg>
      <div
        v-for="resource in resourceInstances"
        :key="resource.name"
        class="resource-instance"
        :style="{ left: resource.x + 'px', top: resource.y + 'px' }"
        @mousedown.stop="(e) => { onResourceMouseDown(e, resource.name); selectResource(resource); }"
        :class="{ selected: selectedResource && selectedResource.name === resource.name }"
      >
        <div class="resource-content-row">
          <div class="resource-icon-container">
            <GenericIcon class="resource-icon" :name=resource.resource />
          </div>
          <div class="resource-labels">
            <div class="resource-name" @dblclick="startEdit(resource, 'name')">
              <template v-if="isEditing(resource, 'name')">
                <input
                  v-model="editValue"
                  @blur="finishEdit(resource, 'name')"
                  @keyup.enter="finishEdit(resource, 'name')"
                  @keyup.esc="cancelEdit"
                  class="edit-input"
                  ref="editInput"
                  style="width: 200px; font-size: 1rem;"
                  :autofocus="true"
                />
              </template>
              <template v-else>
                {{ resource.name }}
              </template>
            </div>
            <div class="resource-type" @dblclick="startEdit(resource, 'type')">
              <template v-if="isEditing(resource, 'type')">
                <input
                  v-model="editValue"
                  @blur="finishEdit(resource, 'type')"
                  @keyup.enter="finishEdit(resource, 'type')"
                  @keyup.esc="cancelEdit"
                  class="edit-input"
                  ref="editInput"
                  style="width: 200px; font-size: 0.85rem;"
                  :autofocus="true"
                />
              </template>
              <template v-else>
                {{ resource.type }}
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="jsonMode && !showMaintenancePlan" class="json-mode">
      <h2 style="text-align: left;">Resources</h2>
      <textarea
        v-model="jsonText"
        @input="onJsonInput"
        class="json-textarea"
        spellcheck="false"
        rows="30"
        style="width: 100%; font-family: monospace; font-size: 1rem; background: #23272e; color: #e6e6e6; border: 1px solid #333b44; border-radius: 8px; padding: 12px;"
      ></textarea>
      <button class="copy-json-btn" @click="copyJsonToClipboard">Copy JSON</button>
      <div v-if="jsonError" style="color: #ff6b6b; margin-top: 8px;">{{ jsonError }}</div>
      <div v-if="jsonCopied" style="color: #7ecfff; margin-top: 8px; font-size: 1rem;">Copied!</div>
    </div>
  </div>
</template>

<script>

import { h, defineComponent } from 'vue';
import GenericIcon from './icons/GenericIcon.vue';
import MaintenancePlan from './MaintenancePlan.vue';

const ArrowLine = defineComponent({
  name: 'ArrowLine',
  props: {
    from: { type: Object, required: true },
    to: { type: Object, required: true },
  },
  render() {
    const { from, to } = this;
    if (!from || !to) return null;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    if (len < 10) return null;
    const angle = Math.atan2(dy, dx);
    // Arrowhead
    const arrowSize = 8;
    const arrowAngle = Math.PI / 2;
    const x2 = to.x - arrowSize * Math.cos(angle);
    const y2 = to.y - arrowSize * Math.sin(angle);
    const arrow1x = x2 + arrowSize * Math.cos(angle - arrowAngle);
    const arrow1y = y2 + arrowSize * Math.sin(angle - arrowAngle);
    const arrow2x = x2 + arrowSize * Math.cos(angle + arrowAngle);
    const arrow2y = y2 + arrowSize * Math.sin(angle + arrowAngle);
    return h('g', {}, [
      h('line', {
        x1: from.x, y1: from.y, x2: to.x, y2: to.y,
        stroke: '#fff', 'stroke-width': 2, 'marker-end': '',
      }),
      h('polygon', {
        points: `${to.x},${to.y} ${arrow1x},${arrow1y} ${arrow2x},${arrow2y}`,
        fill: '#fff',
      })
    ]);
  }
});

const today = new Date();
const threeMonthsAgo = new Date(today);
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

export default {
  components: { GenericIcon, ArrowLine, MaintenancePlan },
  data() {
    return {
      // Example data to show the user what is possible
      resourceInstances: [
        {
          "resource": "Application",
          "name": "Example Application",
          "type": "Version 1.2.3",
          "x": 150,
          "y": 150,
          "arrow_to_resource_names": [
            "Example Container"
          ],
          "maintenance_plans": [
            {
              "name": "Example maintenance plan 1",
              "frequency_days": 180,
              "work_effort_days": 3,
              "last_executed_on_date": threeMonthsAgo.toISOString().split('T')[0]
            },
            {
              "name": "Example maintenance plan 2",
              "frequency_days": 60,
              "work_effort_days": 1,
              "last_executed_on_date": null
            }
          ]
        },
        {
          "resource": "Container",
          "name": "Example Container",
          "type": "Double-click in GUI to edit text",
          "x": 150,
          "y": 250,
          "arrow_to_resource_names": [],
          "maintenance_plans": [
            {
              "name": "Example maintenance plan 3",
              "frequency_days": 90,
              "work_effort_days": 3,
              "last_executed_on_date": null
            }
          ]
        }
      ],
      draggingResourceId: null,
      dragOffset: { x: 0, y: 0 },
      jsonMode: false,
      jsonText: '',
      jsonError: '',
      editing: { resource: null, field: null },
      editValue: '',
      selectedResource: null,
      selectedArrow: null, // { from: resourceName, to: targetName }
      tooltipResource: null,
      addingArrow: false, // true when waiting for target resource selection
      showMaintenancePlan: false,
      jsonCopied: false,
      resourceTypes: [
        "Application",
        "Terminal",
        "Function",

        "Virtual Machine",
        "Container",
        "Server",

        "Database",
        "Storage",
        "Folder",

        "Cloud",
        "Queue",
        "Monitoring",

        "Firewall",
        "Network",
        "Load Balancer",

        "Gateway",
        "Pipeline",
        "Auth",

        "AI",
        "Other",
      ]
    };
  },
  watch: {
    resourceInstances: {
      handler(newVal) {
        if (this.jsonMode) {
          this.jsonText = JSON.stringify(newVal, null, 2);
        }
      },
      deep: true,
    },
    jsonMode(val) {
      if (val) {
        this.jsonText = JSON.stringify(this.resourceInstances, null, 2);
        this.jsonError = '';
      }
    },
  },
  created() {
    document.title = "Open IT Maintenance Planner";
    window.addEventListener('keydown', this.handleDeleteKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleDeleteKey);
  },
  methods: {
    selectArrow(fromName, toName) {
      this.selectedArrow = { from: fromName, to: toName };
      this.selectedResource = null;
    },
    deleteSelectedArrow() {
      if (!this.selectedArrow) return;
      const { from, to } = this.selectedArrow;
      const idx = this.resourceInstances.findIndex(r => r.name === from);
      if (idx !== -1) {
        const arr = this.resourceInstances[idx].arrow_to_resource_names;
        this.resourceInstances[idx].arrow_to_resource_names = arr.filter(n => n !== to);
      }
      this.selectedArrow = null;
    },
    copyJsonToClipboard() {
      navigator.clipboard.writeText(this.jsonText).then(() => {
        this.jsonCopied = true;
        setTimeout(() => { this.jsonCopied = false; }, 1200);
      });
    },
    handleDeleteKey(e) {
      if (e.key === 'Delete' || e.key === 'Del') {
        if (this.selectedResource) {
          this.deleteSelectedResource();
        } else if (this.selectedArrow) {
          this.deleteSelectedArrow();
        }
      }
    },
    setMode(val) {
      this.jsonMode = val;
    },
    onJsonInput() {
      try {
        const arr = JSON.parse(this.jsonText);
        if (!Array.isArray(arr)) throw new Error('JSON must be an array');
        // Check for unique names
        const nameSet = new Set();
        for (const r of arr) {
          if (!r.name) throw new Error('Each resource must have a name');
          if (nameSet.has(r.name)) {
            throw new Error(`Duplicate resource name: "${r.name}"`);
          }
          nameSet.add(r.name);
        }
        this.resourceInstances = arr;
        this.jsonError = '';
      } catch (e) {
        this.jsonError = e.message;
      }
    },
    onDragStart(e, type) {
      if (this.jsonMode) return;
      e.dataTransfer.setData('component', 'resource');
      e.dataTransfer.setData('resource_type', type);
    },
    onDrop(e) {
      if (this.jsonMode) return;
      if (e.dataTransfer.getData('component') === 'resource') {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left - 40;
        const y = e.clientY - rect.top - 20;
        // Generate a unique name
        let baseName = e.dataTransfer.getData('resource_type');
        let name = baseName;
        let counter = 2;
        const names = this.resourceInstances.map(r => r.name);
        while (names.includes(name)) {
          name = `${baseName} ${counter}`;
          counter++;
        }
        this.resourceInstances.push({
          resource: e.dataTransfer.getData('resource_type'),
          name,
          type: 'Resource type and version',
          x,
          y,
          arrow_to_resource_names: [],
          maintenance_plans: [],
        });
      }
    },
    onResourceMouseDown(e, name) {
      if (this.jsonMode) return;
      this.draggingResourceId = name;
      // Always use the resource-instance element for offset
      let el = e.target;
      while (el && !el.classList.contains('resource-instance')) {
        el = el.parentElement;
      }
      const rect = el.getBoundingClientRect();
      this.dragOffset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      document.addEventListener('mousemove', this.onResourceMouseMove);
      document.addEventListener('mouseup', this.onResourceMouseUp);
    },
    onResourceMouseMove(e) {
      if (!this.draggingResourceId || this.jsonMode) return;
      const canvas = this.$el.querySelector('.canvas');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - this.dragOffset.x;
      const y = e.clientY - rect.top - this.dragOffset.y;
      const idx = this.resourceInstances.findIndex(r => r.name === this.draggingResourceId);
      if (idx !== -1) {
        // Vue 3: direct assignment is reactive
        this.resourceInstances[idx] = { ...this.resourceInstances[idx], x, y };
      }
    },
    onResourceMouseUp() {
      if (this.jsonMode) return;
      this.draggingResourceId = null;
      document.removeEventListener('mousemove', this.onResourceMouseMove);
      document.removeEventListener('mouseup', this.onResourceMouseUp);
    },
    isEditing(resource, field) {
      return this.editing.resource === resource && this.editing.field === field;
    },
    startEdit(resource, field) {
      this.editing = { resource, field };
      this.editValue = resource[field];
      this.$nextTick(() => {
        if (this.$refs.editInput) {
          if (Array.isArray(this.$refs.editInput)) {
            this.$refs.editInput[0].focus();
          } else {
            this.$refs.editInput.focus();
          }
        }
      });
    },
    finishEdit(resource, field) {
      if (field === 'name') {
        // Prevent duplicate names
        const exists = this.resourceInstances.some(r => r !== resource && r.name === this.editValue);
        if (exists) {
          this.jsonError = `Duplicate resource name: "${this.editValue}"`;
          return;
        } else {
          this.jsonError = '';
        }
        // Update all arrow_to_resource_names references
        const oldName = resource.name;
        const newName = this.editValue;
        this.resourceInstances.forEach(r => {
          if (Array.isArray(r.arrow_to_resource_names)) {
            r.arrow_to_resource_names = r.arrow_to_resource_names.map(n => n === oldName ? newName : n);
          }
        });
      }
      resource[field] = this.editValue;
      this.editing = { resource: null, field: null };
    },
    cancelEdit() {
      this.editing = { resource: null, field: null };
    },
    selectResource(resource) {
      // If in arrow-adding mode, treat this as picking the target
      if (this.addingArrow && this.selectedResource && resource !== this.selectedResource) {
        this.addArrowTo(resource);
        this.addingArrow = false;
        return;
      }
      this.selectedResource = resource;
      this.selectedArrow = null;
    },
    startAddArrow() {
      this.addingArrow = true;
    },
    addArrowTo(targetResource) {
      // Add targetResource.name to selectedResource.arrow_to_resource_names if not already present
      const idx = this.resourceInstances.findIndex(r => r.name === this.selectedResource.name);
      if (idx !== -1) {
        const arr = this.resourceInstances[idx].arrow_to_resource_names;
        if (!arr.includes(targetResource.name)) {
          arr.push(targetResource.name);
        }
      }
    },
    deselectResource() {
      this.selectedResource = null;
      this.selectedArrow = null;
      this.addingArrow = false;
    },
    showResourceTooltip(resource) {
      this.tooltipResource = resource;
    },
    hideResourceTooltip() {
      this.tooltipResource = null;
    },
    deleteSelectedResource() {
      if (!this.selectedResource) return;
      const deletedName = this.selectedResource.name;
      // Remove the resource
      this.resourceInstances = this.resourceInstances.filter(r => r.name !== deletedName);
      // Remove references in arrow_to_resource_names
      this.resourceInstances.forEach(r => {
        if (Array.isArray(r.arrow_to_resource_names)) {
          r.arrow_to_resource_names = r.arrow_to_resource_names.filter(n => n !== deletedName);
        }
      });
      this.selectedResource = null;
    },
    getResourceByName(name) {
      return this.resourceInstances.find(r => r.name === name);
    },
    getArrowFrom(resource) {
      // Bottom of icon
      const width = 58, height = 60;
      return {
        x: resource.x + width / 2,
        y: resource.y + height,
      };
    },
    getArrowTo(resource) {
      // Top of icon
      const width = 58;
      return {
        x: resource.x + width / 2,
        y: resource.y - 5,
      };
    },
    addMaintenancePlan() {
      if (!this.selectedResource) return;
      if (!Array.isArray(this.selectedResource.maintenance_plans)) {
        this.$set(this.selectedResource, 'maintenance_plans', []);
      }
      this.selectedResource.maintenance_plans.push({
        name: '',
        frequency_days: 30,
        work_effort_days: 1,
        last_executed_on_date: null,
      });
    },
    removeMaintenancePlan(idx) {
      if (!this.selectedResource || !Array.isArray(this.selectedResource.maintenance_plans)) return;
      this.selectedResource.maintenance_plans.splice(idx, 1);
    },
    generateMaintenancePlan() {
      // Placeholder for generation logic
      alert('Maintenance plan generation is not yet implemented.');
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.editing.resource && this.$refs.editInput) {
        if (Array.isArray(this.$refs.editInput)) {
          this.$refs.editInput[0].focus();
        } else {
          this.$refs.editInput.focus();
        }
      }
    });
  },
  computed: {
    canvasWidth() {
      // Find max x + width
      const margin = 220;
      return Math.max(800, ...this.resourceInstances.map(r => r.x + margin));
    },
    canvasHeight() {
      const margin = 120;
      return Math.max(600, ...this.resourceInstances.map(r => r.y + margin));
    },
  }
};
</script>

<style scoped>
.app-container {
  display: flex;
  /* Assume NavBar is 56px tall; adjust if needed */
  height: calc(100vh - 56px);
  background: #181c20;
  color: #e6e6e6;
}
.toolbar {
  width: 230px;
  min-width: 230px;
  max-width: 230px;
  flex: 0 0 230px;
  background: #23272e;
  padding: 24px 8px;
  border-right: 1px solid #333b44;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 56px);
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
.resource-list-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 16px;
}
.resource-component {
  background: #2a3550;
  border: 1px solid #fff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  user-select: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  margin-bottom: 0;
  cursor: grab;
  transition: box-shadow 0.2s, background 0.3s, border-color 0.3s;
  color: #fff;
  font-size: 1.1rem;
  padding: 3px;
  width: 58px;
  height: 60px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.resource-instance {
  background: #2a3550;
  border: 1px solid #fff;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  user-select: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  margin-bottom: 12px;
  cursor: grab;
  transition: box-shadow 0.2s, background 0.3s, border-color 0.3s;
  color: #fff;
  font-size: 1.1rem;
  padding: 3px;
}
.resource-component {
  width: 58px;
  height: 60px;
}
.resource-instance {
  display: flex
}
.resource-component:active,
.resource-instance:active {
  cursor: grabbing;
}
.canvas {
  flex: 1;
  position: relative;
  background: #181c20;
  overflow: hidden;
  height: calc(100vh - 56px);
}
.resource-instance {
  position: absolute;
  cursor: move;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  border: none;
  box-shadow: none;
  transition: box-shadow 0.2s, border-color 0.2s;
}
.resource-instance.selected {
  border: 2px solid #7ecfff;
  box-shadow: 0 0 0 2px #7ecfff44;
}
.resource-content-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
.resource-icon-container {
  background: #2a3550;
  border: 1px solid #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.resource-icon {
  width: 50px;
  height: 50px;
}
.resource-tooltip {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 8px);
  background: #23272e;
  color: #7ecfff;
  border: 1px solid #7ecfff;
  border-radius: 6px;
  padding: 10px 10px;
  font-size: 0.95rem;
  white-space: nowrap;
  z-index: 10;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
.resource-labels {
  text-align: left;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.resource-name {
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2px;
}
.resource-type {
  font-size: 0.85rem;
  color: #b0b8c9;
}
.toggle-switch {
  display: flex;
  margin-bottom: 4px;
  border-radius: 8px;
  border: 1px solid #fff;
  background: #2a3550;
  width: 180px;
}
.toggle-side {
  flex: 1;
  padding: 8px 0;
  background: transparent;
  color: #fff;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  color: #aaa
}
.toggle-side.active {
  background: #3a4660;
  color: #e6e6e6;
  font-weight: bold;
}
.toggle-side:not(.active):hover {
  background: #23272e;
}
.toggle-side-left {
  border-radius: 8px 0px 0px 8px;
}
.toggle-side-right {
  border-radius: 0px 8px 8px 0px;
}
.json-mode {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: #181c20;
  padding: 24px;
}
.edit-input {
  border: 1px solid #b0b8c9;
  border-radius: 4px;
  padding: 2px 6px;
  outline: none;
  background: #23272e;
  color: #fff;
}
.selected-resource-label {
  margin-top: 10px;
  text-align: center;
}
.toolbar-button {
  margin-top: 8px;
  background: #2a3550;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.toolbar-button:hover {
  background: #3a4660;
}
.delete-btn {
  background: #ff4d4f;
}
.delete-btn:hover {
  background: #d9363e;
}
.maintenance-plans-toolbar {
  margin-top: 30px;
  width: 180px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.maintenance-plan-item-vertical {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  margin-bottom: 14px;
}
.plan-label {
  color: #fff;
  font-size: 0.93rem;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  text-align: left;
}
.plan-input {
  border: 1px solid #b0b8c9;
  border-radius: 4px;
  padding: 2px 6px;
  outline: none;
  background: #23272e;
  color: #fff;
}

/* Make the calendar icon in date inputs white */
.plan-input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
.plan-input[type="date"]::-ms-input-placeholder {
  color: #fff;
}
.plan-input[type="date"]::-moz-placeholder {
  color: #fff;
}
.plan-input[type="date"]::-webkit-input-placeholder {
  color: #fff;
}
.plan-input[type="date"]::-o-input-placeholder {
  color: #fff;
}
.plan-input[type="date"]::-webkit-input-placeholder {
  color: #fff;
}
.plan-input[type="date"]::-webkit-inner-spin-button,
.plan-input[type="date"]::-webkit-clear-button {
  filter: invert(1);
}
.plan-input[type="date"]::-moz-calendar-picker-indicator {
  filter: invert(1);
}
.plan-input[type="date"]::-ms-calendar-picker-indicator {
  filter: invert(1);
}
.plan-add-btn {
  margin-top: 6px;
  background: #2a3550;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 0.98rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.plan-add-btn:hover {
  background: #3a4660;
}
.plan-delete-btn {
  background: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding-bottom: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.plan-delete-btn:hover {
  background: #d9363e;
}
.generate-plan-btn {
  margin: 8px;
  width: 180px;
  background: #2a3550;
  color: #e6e6e6;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  margin-bottom: 10px;
}
.generate-plan-btn:hover {
  background: #3a4660;
}
.copy-json-btn {
  margin-bottom: 12px;
  background: #2a3550;
  color: #e6e6e6;
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}
.copy-json-btn:hover {
  background: #3a4660;
}
</style>
