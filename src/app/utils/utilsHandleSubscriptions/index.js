export const handleSubscriptions = (canceledSubscription, subscriptions) => {
  let updatedSubscription = subscriptions.filter(
    (subscription) => subscription.id !== canceledSubscription.id,
  )
  updatedSubscription = [...updatedSubscription, canceledSubscription]

  return updatedSubscription
}
