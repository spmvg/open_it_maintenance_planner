<template>
  <div class="faq-container">
    <h1>Frequently Asked Questions</h1>
    <div class="faq-list">
      <div class="faq-item" v-for="(faq, idx) in faqs" :key="idx">
        <h3 class="faq-question">{{ faq.q }}</h3>
        <p class="faq-answer">{{ faq.a }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FAQ',
  data() {
    return {
      faqs: [
        {
          q: 'What is Open IT Maintenance Planner?',
          a: 'This is a tool to visually plan, document, and manage IT maintenance tasks and dependencies. You can use this tool to generate a maintenance report, including a month-by-month timeline of workload.'
        },
        {
          q: 'Can I see an example maintenance report?',
          a: 'Example data is loaded by default. Click "Show Maintenance Report" to see an example.'
        },
        {
          q: 'How do I add a new resource?',
          a: 'Drag a resource from the "Add Resources" section onto the canvas.'
        },
        {
          q: 'How do I connect resources?',
          a: 'Select a resource, click the arrow button, then click the target resource. Connecting resources can be a useful way to display a multitier architecture or dependencies.'
        },
        {
          q: 'How do I edit resource details?',
          a: 'Double-click the resource name or subtitle to edit. Press Enter or click outside to save.'
        },
        {
          q: 'What is a maintenance plan?',
          a: 'A maintenance plan is a scheduled task designed to keep IT resources running reliably. It contains a name, frequency in days, the work effort in days and optionally when the plan was last executed.'
        },
        {
          q: 'How do I add a maintenance plan?',
          a: 'Click on a resource in the canvas and then "Add Plan" in the toolbar.'
        },
        {
          q: 'Can I export my resources?',
          a: 'Switch to JSON mode and use the "Copy JSON" button to copy your resources.'
        },
        {
          q: 'Where is my data saved?',
          a: 'Data is not stored. Copy the JSON of your plan and save it before you close the window.'
        }
      ]
    }
  },
  created() {
    document.title = "FAQ";
  }
}
</script>

<style scoped>
.faq-container {
  max-width: 800px;
  margin: 40px auto;
  background: #23272e;
  color: #e6e6e6;
  border-radius: 12px;
  padding: 32px 24px;
  box-shadow: 0 2px 16px #0002;
}
.faq-list {
  margin-top: 24px;
}
.faq-item {
  margin-bottom: 28px;
}
.faq-question {
  font-size: 1.2rem;
  color: #7ecfff;
  margin-bottom: 6px;
}
.faq-answer {
  font-size: 1rem;
  color: #e6e6e6;
  margin: 0;
}
</style>
