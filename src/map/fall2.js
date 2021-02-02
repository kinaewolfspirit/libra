import { computed, inject } from 'vue'
import Talker from '@/util/Talker'
import { FOREVER_STEPS } from '@/data/eventSteps'
export default {
  name: '秋2',
  async create () {
    const field = inject('field').value
    const talk = inject('talk').value
    const state = inject('storage').state

    const torrent = field.getObjectById(3)
    const speakTorrent = talk.getSpeakScripts(new Talker('秋トレント', torrent.object))

    let skipStart1 = false
    torrent.setVisible(computed(() => state.events.forever < FOREVER_STEPS.EXECUTED))
    torrent.setTapEvent(async () => {
      if (state.events.forever === FOREVER_STEPS.STARTED) {
        if (!skipStart1) {
          await speakTorrent(t('events.forever.torrent.greet'))
          await speakTorrent(t('events.forever.torrent.start1'))
          skipStart1 = true
        }
        await speakTorrent(t('events.forever.torrent.start2'))
      } else {
        await speakTorrent(t('events.forever.torrent.greet'))
      }
    })
    torrent.setDestroyEvent(() => {
      state.events.forever = FOREVER_STEPS.EXECUTED
    })
  }
}
