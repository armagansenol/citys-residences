"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    startWidget?: (config?: { user_data?: Record<string, string> }) => void
    __aloWidgetInitDone?: boolean
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]

function readUTMs() {
  const params = new URLSearchParams(window.location.search)
  const out: Record<string, string> = {}
  UTM_KEYS.forEach((k) => {
    const v = params.get(k)
    if (v) out[k] = v
  })
  return out
}

export default function UTMWidgetInit() {
  useEffect(() => {
    // first/last touch kaydet
    const utms = readUTMs()
    if (!localStorage.getItem("first_touch_utms") && Object.keys(utms).length) {
      localStorage.setItem("first_touch_utms", JSON.stringify(utms))
    }
    if (Object.keys(utms).length) {
      sessionStorage.setItem("last_touch_utms", JSON.stringify(utms))
    }

    // const first = localStorage.getItem("first_touch_utms")
    // const last = sessionStorage.getItem("last_touch_utms")
    // const first_touch = first ? JSON.parse(first) : {}
    // const last_touch = last ? JSON.parse(last) : {}

    function init() {
      const w = window
      if (typeof w.startWidget !== "function") {
        setTimeout(init, 120)
        return
      }
      // tekrar çağrılmayı engelle
      if (w.__aloWidgetInitDone) return
      w.__aloWidgetInitDone = true

      w.startWidget({
        user_data: {
          UTM: "campaign-test",
        },
      })
    }

    init()
  }, [])

  return null
}

// 1.	UTM takibi için chat script’ine uygun değişken alan eklenmesi için örnek webchat scriptini aşağıda paylaşıyorum.

// <script type="text/javascript" src="//citysresidences.alo-tech.com/click2connects/click2connect.js?widget_key=ahRzfm11c3RlcmktaGl6bWV0bGVyaXIhCxIUQ2xpY2syQ29ubmVjdFBhY2thZ2UYgIDqqaynnAsMogEcY2l0eXNyZXNpZGVuY2VzLmFsby10ZWNoLmNvbQ"></script>
// <script type="text/javascript">
// startWidget({user_data: {UTM: "campaign"}});
