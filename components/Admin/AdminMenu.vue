<template lang="pug">
.md_py-6.md_px-4
    .mb-8
        p.hidden.px-4.mb-3.text-xs.tracking-widest.text-grey-200.md_px-3.md_block.uppercase MENU

        NuxtLink.router-link.flex.items-center.p-4.cursor-pointer.group(to="/admin/reservations", @click="$emit('toggleMenu')")
            SVGIcon.text-grey-100.mr-2.group-hover_text-grey-200(svg="check", :size="20")
            p.text-sm.text-grey-200.tracking-wide {{ $t("admin.reservations.page_name") }}
        NuxtLink.router-link.flex.items-center.p-4.cursor-pointer.group(to="/admin/day-summary", @click="$emit('toggleMenu')")
            SVGIcon.text-grey-100.mr-2.group-hover_text-grey-200(svg="calendar", :size="20")
            p.text-sm.text-grey-200.tracking-wide {{ $t("admin.day_summary.page_name") }}
        NuxtLink.router-link.flex.items-center.p-4.cursor-pointer.group(to="/admin/work-hours", @click="$emit('toggleMenu')")
            SVGIcon.text-grey-100.mr-2.group-hover_text-grey-200(svg="clock", :size="20")
            p.text-sm.text-grey-200.tracking-wide {{ $t("admin.work_hours.page_name") }}
        NuxtLink.router-link.flex.items-center.p-4.cursor-pointer.group(to="/admin/discounts", @click="$emit('toggleMenu')")
            SVGIcon.text-grey-100.mr-2.group-hover_text-grey-200(svg="discount", :size="20")
            p.text-sm.text-grey-200.tracking-wide {{ $t("admin.discounts.page_name") }}

    .mb-4.md_mb-8
        p.mb-3.px-3.text-xs.tracking-widest.text-grey-200.uppercase {{ $t("admin.sidebar_links.blocks") }}

        NuxtLink.router-link.flex.items-center.p-4.cursor-pointer.group(to="/admin/blocked-days", @click="$emit('toggleMenu')")
            SVGIcon.text-grey-100.mr-2.group-hover_text-grey-200(svg="block", :size="20")
            p.text-sm.text-grey-200.tracking-wide {{ $t("admin.blocked_days.page_name") }}
        NuxtLink.router-link.flex.items-center.p-4.cursor-pointer.group(to="/admin/blocked-time", @click="$emit('toggleMenu')")
            SVGIcon.text-grey-100.mr-2.group-hover_text-grey-200(svg="block", :size="20")
            p.text-sm.text-grey-200.tracking-wide {{ $t("admin.blocked_times.page_name") }}

    slot
</template>
