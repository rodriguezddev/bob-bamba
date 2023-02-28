export const orderSubscriptions = (subscriptionsState) => {
  let subscriptions = [...subscriptionsState]

  subscriptions = subscriptions.sort(
    (subscriptionsPrev, subscriptionsNext) => new Date(subscriptionsNext.activated_at)
      - new Date(subscriptionsPrev.activated_at),
  )

  return subscriptions
}

export const handleSubscriptionsCanceled = (
  subscriptions,
  canceledSubscription,
) => {
  let updatedSubscription = subscriptions.filter(
    (subscription) => subscription.id !== canceledSubscription.id,
  )

  updatedSubscription = [...updatedSubscription, canceledSubscription]

  return updatedSubscription
}

export const handleSubscriptionsNumbers = (subscriptions) => {
  const canceledSubscriptions = subscriptions.filter(
    (subscription) => subscription.status !== 'CANCELED',
  )

  return canceledSubscriptions.length
}
